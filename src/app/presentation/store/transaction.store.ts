import { Injectable, signal, computed, inject } from '@angular/core';
import { Transaction, TransactionStatus, TransactionType } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

export interface TransactionState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  isLoading: boolean;
  error: string | null;
  currentFilter: TransactionFilter;
  pagination: TransactionPagination;
}

export interface TransactionFilter {
  status?: TransactionStatus;
  type?: TransactionType;
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}

export interface TransactionPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const initialState: TransactionState = {
  transactions: [],
  selectedTransaction: null,
  isLoading: false,
  error: null,
  currentFilter: {},
  pagination: {
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0
  }
};

@Injectable({
  providedIn: 'root'
})
export class TransactionStore {
  private readonly transactionRepository = inject(TransactionRepository);

  private readonly state = signal<TransactionState>(initialState);

  readonly transactions = computed(() => this.state().transactions);
  readonly selectedTransaction = computed(() => this.state().selectedTransaction);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);
  readonly currentFilter = computed(() => this.state().currentFilter);
  readonly pagination = computed(() => this.state().pagination);

  readonly hasMorePages = computed(() => {
    const { page, totalPages } = this.state().pagination;
    return page < totalPages;
  });

  readonly pendingTransactions = computed(() =>
    this.state().transactions.filter(t => t.status === TransactionStatus.PENDING)
  );

  readonly recentTransactions = computed(() =>
    this.state().transactions.slice(0, 5)
  );

  readonly totalAmount = computed(() =>
    this.state().transactions.reduce((sum, t) => sum + t.calculateBalanceImpact(), 0)
  );

  setLoading(isLoading: boolean): void {
    this.state.update(state => ({ ...state, isLoading }));
  }

  setError(error: string | null): void {
    this.state.update(state => ({ ...state, error, isLoading: false }));
  }

  setTransactions(transactions: Transaction[]): void {
    this.state.update(state => ({
      ...state,
      transactions,
      isLoading: false,
      error: null
    }));
  }

  addTransaction(transaction: Transaction): void {
    this.state.update(state => ({
      ...state,
      transactions: [transaction, ...state.transactions],
      isLoading: false,
      error: null
    }));
  }

  updateTransaction(updatedTransaction: Transaction): void {
    this.state.update(state => ({
      ...state,
      transactions: state.transactions.map(t =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ),
      isLoading: false,
      error: null
    }));
  }

  selectTransaction(transaction: Transaction | null): void {
    this.state.update(state => ({ ...state, selectedTransaction: transaction }));
  }

  setFilter(filter: TransactionFilter): void {
    this.state.update(state => ({
      ...state,
      currentFilter: filter,
      pagination: { ...state.pagination, page: 1 }
    }));
  }

  clearFilter(): void {
    this.state.update(state => ({
      ...state,
      currentFilter: {},
      pagination: { ...state.pagination, page: 1 }
    }));
  }

  setPagination(pagination: Partial<TransactionPagination>): void {
    this.state.update(state => ({
      ...state,
      pagination: { ...state.pagination, ...pagination }
    }));
  }

  nextPage(): void {
    this.state.update(state => ({
      ...state,
      pagination: { ...state.pagination, page: state.pagination.page + 1 }
    }));
  }

  previousPage(): void {
    this.state.update(state => ({
      ...state,
      pagination: {
        ...state.pagination,
        page: Math.max(1, state.pagination.page - 1)
      }
    }));
  }

  reset(): void {
    this.state.set(initialState);
  }

  async loadTransactions(accountId: string): Promise<void> {
    this.setLoading(true);
    try {
      const { page, pageSize } = this.state().pagination;
      const transactions = await this.transactionRepository.findByAccountId(
        accountId,
        pageSize,
        (page - 1) * pageSize
      );
      this.setTransactions(transactions);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to load transactions');
    }
  }

  async loadMoreTransactions(accountId: string): Promise<void> {
    if (!this.hasMorePages()) return;

    this.setLoading(true);
    try {
      const { page, pageSize } = this.state().pagination;
      const newTransactions = await this.transactionRepository.findByAccountId(
        accountId,
        pageSize,
        page * pageSize
      );

      this.state.update(state => ({
        ...state,
        transactions: [...state.transactions, ...newTransactions],
        isLoading: false,
        error: null
      }));

      this.nextPage();
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to load more transactions');
    }
  }

  async syncTransactions(): Promise<void> {
    this.setLoading(true);
    try {
      await this.transactionRepository.syncWithBackend();
      const accountId = this.state().transactions[0]?.accountId;
      if (accountId) {
        await this.loadTransactions(accountId);
      }
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Failed to sync transactions');
    }
  }
}