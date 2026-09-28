import { Injectable, inject } from '@angular/core';
import { Observable, from, switchMap, catchError, of } from 'rxjs';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus, TransactionType } from '../entities/transaction.entity';
import { Account } from '../entities/account.entity';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountRepository } from '../repositories/account.repository';

export interface ProcessTransactionInput {
  accountId: string;
  amount: number;
  type: TransactionType;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface ProcessTransactionOutput {
  success: boolean;
  transaction?: Transaction;
  error?: string;
  balanceAfter?: number;
}

export interface ProcessTransactionValidationResult {
  isValid: boolean;
  errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProcessTransactionUseCase {
  private readonly transactionRepository: TransactionRepository = inject(TransactionRepository);
  private readonly accountRepository: AccountRepository = inject(AccountRepository);

  private static readonly MAX_TRANSACTION_AMOUNT = 100000;
  private static readonly MIN_TRANSACTION_AMOUNT = 0.01;
  private static readonly MAX_DAILY_TRANSACTIONS = 50;

  async execute(input: ProcessTransactionInput): Promise<ProcessTransactionOutput> {
    const validation = this.validateInput(input);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join('; ')
      };
    }

    try {
      const account = await this.accountRepository.findById(input.accountId);
      if (!account) {
        return {
          success: false,
          error: 'Cuenta no encontrada'
        };
      }

      if (!account.isActive()) {
        return {
          success: false,
          error: 'La cuenta no está activa'
        };
      }

      const balanceImpact = this.calculateBalanceImpact(input.amount, input.type);
      if (!account.hasSufficientFunds(Math.abs(balanceImpact))) {
        return {
          success: false,
          error: 'Saldo insuficiente para realizar la transacción'
        };
      }

      const dailyTransactionCount = await this.getDailyTransactionCount(input.accountId);
      if (dailyTransactionCount >= ProcessTransactionUseCase.MAX_DAILY_TRANSACTIONS) {
        return {
          success: false,
          error: 'Límite diario de transacciones alcanzado'
        };
      }

      const transaction = this.createTransaction(input, balanceImpact);
      const savedTransaction = await this.transactionRepository.save(transaction);

      const newBalance = account.adjustBalance(balanceImpact);
      await this.accountRepository.updateBalance(input.accountId, this.extractBalance(newBalance));

      return {
        success: true,
        transaction: savedTransaction,
        balanceAfter: this.extractBalance(newBalance)
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido al procesar transacción'
      };
    }
  }

  validateInput(input: ProcessTransactionInput): ProcessTransactionValidationResult {
    const errors: string[] = [];

    if (!input.accountId || input.accountId.trim().length === 0) {
      errors.push('El ID de cuenta es requerido');
    }

    if (input.amount <= 0) {
      errors.push('El monto debe ser mayor a cero');
    }

    if (input.amount > ProcessTransactionUseCase.MAX_TRANSACTION_AMOUNT) {
      errors.push(`El monto excede el límite máximo de ${ProcessTransactionUseCase.MAX_TRANSACTION_AMOUNT}`);
    }

    if (input.amount < ProcessTransactionUseCase.MIN_TRANSACTION_AMOUNT) {
      errors.push(`El monto mínimo es ${ProcessTransactionUseCase.MIN_TRANSACTION_AMOUNT}`);
    }

    if (!input.type || !Object.values(TransactionType).includes(input.type)) {
      errors.push('Tipo de transacción inválido');
    }

    if (!input.description || input.description.trim().length === 0) {
      errors.push('La descripción es requerida');
    }

    if (input.description && input.description.length > 200) {
      errors.push('La descripción no puede exceder 200 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private calculateBalanceImpact(amount: number, type: TransactionType): number {
    switch (type) {
      case TransactionType.DEPOSIT:
      case TransactionType.CREDIT:
        return amount;
      case TransactionType.WITHDRAWAL:
      case TransactionType.DEBIT:
      case TransactionType.TRANSFER:
        return -amount;
      case TransactionType.PAYMENT:
        return -amount;
      case TransactionType.REFUND:
        return amount;
      default:
        return 0;
    }
  }

  private createTransaction(input: ProcessTransactionInput, balanceImpact: number): Transaction {
    const now = new Date();
    const transactionData = {
      id: this.generateTransactionId(),
      accountId: input.accountId,
      amount: input.amount,
      type: input.type,
      status: TransactionStatus.PENDING,
      description: input.description,
      createdAt: now,
      updatedAt: now,
      metadata: input.metadata || {}
    };

    return new Transaction(
      transactionData.id,
      transactionData.accountId,
      transactionData.amount,
      transactionData.type,
      transactionData.status,
      transactionData.description,
      transactionData.createdAt,
      transactionData.updatedAt,
      transactionData.metadata
    );
  }

  private generateTransactionId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `TXN-${timestamp}-${randomPart}`.toUpperCase();
  }

  private async getDailyTransactionCount(accountId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const transactions = await this.transactionRepository.findByAccountId(accountId, 100, 0);
      const todayTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.createdAt);
        txDate.setHours(0, 0, 0, 0);
        return txDate.getTime() === today.getTime();
      });
      return todayTransactions.length;
    } catch {
      return 0;
    }
  }

  private extractBalance(account: Account): number {
    const balanceProperty = (account as unknown as { balance: number }).balance;
    return balanceProperty ?? 0;
  }
}