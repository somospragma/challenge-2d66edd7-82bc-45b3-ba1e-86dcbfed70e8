import { Injectable, inject } from '@angular/core';
import { Observable, from, map, catchError } from 'rxjs';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';

export interface GetAccountBalanceInput {
  accountId: string;
  includePending?: boolean;
}

export interface GetAccountBalanceOutput {
  accountId: string;
  currentBalance: number;
  availableBalance: number;
  pendingAmount: number;
  lastUpdated: Date;
  accountStatus: string;
}

export interface BalanceCalculationResult {
  currentBalance: number;
  pendingDebits: number;
  pendingCredits: number;
}

@Injectable({
  providedIn: 'root'
})
export class GetAccountBalanceUseCase {
  private readonly accountRepository: AccountRepository = inject(AccountRepository);
  private readonly transactionRepository: TransactionRepository = inject(TransactionRepository);

  async execute(input: GetAccountBalanceInput): Promise<GetAccountBalanceOutput> {
    const account = await this.accountRepository.findById(input.accountId);

    if (!account) {
      throw new Error('Cuenta no encontrada');
    }

    if (!account.isActive()) {
      throw new Error('La cuenta no está activa');
    }

    const balanceCalculation = await this.calculateBalance(input.accountId, input.includePending ?? true);

    return {
      accountId: input.accountId,
      currentBalance: balanceCalculation.currentBalance,
      availableBalance: this.calculateAvailableBalance(balanceCalculation),
      pendingAmount: balanceCalculation.pendingDebits - balanceCalculation.pendingCredits,
      lastUpdated: new Date(),
      accountStatus: 'ACTIVE'
    };
  }

  async calculateBalance(accountId: string, includePending: boolean): Promise<BalanceCalculationResult> {
    const transactions = await this.transactionRepository.findByAccountId(accountId, 1000, 0);

    let currentBalance = 0;
    let pendingDebits = 0;
    let pendingCredits = 0;

    for (const transaction of transactions) {
      if (!includePending && transaction.status === TransactionStatus.PENDING) {
        continue;
      }

      if (transaction.status === TransactionStatus.COMPLETED || transaction.status === TransactionStatus.PENDING) {
        const impact = transaction.calculateBalanceImpact();

        if (transaction.status === TransactionStatus.COMPLETED) {
          currentBalance += impact;
        } else if (includePending && transaction.status === TransactionStatus.PENDING) {
          if (impact < 0) {
            pendingDebits += Math.abs(impact);
          } else {
            pendingCredits += impact;
          }
        }
      }
    }

    return {
      currentBalance,
      pendingDebits,
      pendingCredits
    };
  }

  private calculateAvailableBalance(calculation: BalanceCalculationResult): number {
    const pendingDebits = calculation.pendingDebits;
    const currentBalance = calculation.currentBalance;
    const available = currentBalance - pendingDebits;
    return Math.max(0, available);
  }

  async getBalanceWithCache(accountId: string, cacheDurationMs: number = 30000): Promise<GetAccountBalanceOutput> {
    const cacheKey = `balance_cache_${accountId}`;
    const cached = this.getCachedBalance(cacheKey);

    if (cached && this.isCacheValid(cached, cacheDurationMs)) {
      return cached;
    }

    const result = await this.execute({ accountId, includePending: true });
    this.setCachedBalance(cacheKey, result);

    return result;
  }

  private getCachedBalance(key: string): GetAccountBalanceOutput | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      parsed.lastUpdated = new Date(parsed.lastUpdated);
      return parsed;
    } catch {
      return null;
    }
  }

  private setCachedBalance(key: string, value: GetAccountBalanceOutput): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to cache balance:', error);
    }
  }

  private isCacheValid(cached: GetAccountBalanceOutput, durationMs: number): boolean {
    const now = new Date().getTime();
    const cachedTime = new Date(cached.lastUpdated).getTime();
    return (now - cachedTime) < durationMs;
  }

  async getTransactionHistory(
    accountId: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<Transaction[]> {
    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      throw new Error('Cuenta no encontrada');
    }

    return this.transactionRepository.findByAccountId(accountId, limit, offset);
  }
}