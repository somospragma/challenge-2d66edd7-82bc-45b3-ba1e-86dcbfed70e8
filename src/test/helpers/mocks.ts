import { Transaction, TransactionStatus, TransactionType } from '../../app/domain/entities/transaction.entity';
import { Account, AccountStatus } from '../../app/domain/entities/account.entity';
import { TransactionRepository } from '../../app/domain/repositories/transaction.repository';

export const mockTransaction = (overrides?: Partial<Transaction>): Transaction => {
  return {
    id: 'txn-123',
    accountId: 'acc-456',
    amount: 100.00,
    type: TransactionType.DEBIT,
    status: TransactionStatus.PENDING,
    description: 'Test transaction',
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
    calculateBalanceImpact: () => -100.00,
    isProcessable: () => true,
    withStatus: (newStatus: TransactionStatus) => mockTransaction({ status: newStatus }),
    ...overrides
  } as Transaction;
};

export const mockAccount = (overrides?: Partial<Account>): Account => {
  return {
    id: 'acc-456',
    accountNumber: '1234567890',
    balance: 1000.00,
    status: AccountStatus.ACTIVE,
    currency: 'USD',
    isActive: () => true,
    adjustBalance: (amount: number) => mockAccount({ balance: 1000.00 + amount }),
    withStatus: (newStatus: AccountStatus) => mockAccount({ status: newStatus }),
    hasSufficientFunds: (amount: number) => 1000.00 >= amount,
    ...overrides
  } as Account;
};

export const mockTransactionRepository = (): jest.Mocked<TransactionRepository> => {
  return {
    save: jest.fn().mockResolvedValue(mockTransaction()),
    findById: jest.fn().mockResolvedValue(mockTransaction()),
    findByAccountId: jest.fn().mockResolvedValue([mockTransaction()]),
    findPendingTransactions: jest.fn().mockResolvedValue([mockTransaction()]),
    updateStatus: jest.fn().mockResolvedValue(mockTransaction()),
    syncWithBackend: jest.fn().mockResolvedValue(undefined)
  };
};