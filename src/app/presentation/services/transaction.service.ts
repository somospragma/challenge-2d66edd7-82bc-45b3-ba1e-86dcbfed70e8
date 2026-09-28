import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, catchError, tap, switchMap, finalize } from 'rxjs/operators';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/entities/transaction.entity';
import { TransactionType } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private selectedTransactionSubject = new BehaviorSubject<Transaction | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();
  selectedTransaction$ = this.selectedTransactionSubject.asObservable();

  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository,
    private notificationService: NotificationService
  ) {}

  loadTransactions(accountId: string, limit: number = 50, offset: number = 0): void {
    this.setLoading(true);
    this.clearError();

    this.transactionRepository.findByAccountId(accountId, limit, offset).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Loaded ${transactions.length} transactions for account ${accountId}`);
        this.transactionsSubject.next(transactions);
      }),
      catchError(error => {
        console.error('[TransactionService] Error loading transactions:', error);
        this.setError('Failed to load transactions');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    ).subscribe();
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.save(transaction).pipe(
      delay(100),
      tap(savedTransaction => {
        console.log(`[TransactionService] Transaction created: ${savedTransaction.id}`);
        this.notificationService.success('Transaction created successfully');
        this.addTransactionToList(savedTransaction);
      }),
      catchError(error => {
        console.error('[TransactionService] Error creating transaction:', error);
        this.setError('Failed to create transaction');
        this.notificationService.error('Failed to create transaction');
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  processTransaction(transactionId: string): Observable<Transaction> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findById(transactionId).pipe(
      switchMap(transaction => {
        if (!transaction) {
          throw new Error(`Transaction not found: ${transactionId}`);
        }

        if (!transaction.isProcessable()) {
          throw new Error('Transaction cannot be processed in current status');
        }

        return this.accountRepository.hasSufficientFunds(transaction.accountId, Math.abs(transaction.amount));
      }),
      switchMap(hasFunds => {
        if (!hasFunds) {
          throw new Error('Insufficient funds');
        }
        return this.transactionRepository.updateStatus(transactionId, TransactionStatus.COMPLETED);
      }),
      tap(updatedTransaction => {
        console.log(`[TransactionService] Transaction processed: ${transactionId}`);
        this.notificationService.success('Transaction processed successfully');
        this.updateTransactionInList(updatedTransaction);
      }),
      catchError(error => {
        console.error('[TransactionService] Error processing transaction:', error);
        const errorMessage = error.message || 'Failed to process transaction';
        this.setError(errorMessage);
        this.notificationService.error(errorMessage);
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  rejectTransaction(transactionId: string, reason: string): Observable<Transaction> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.updateStatus(transactionId, TransactionStatus.REJECTED).pipe(
      delay(100),
      tap(updatedTransaction => {
        console.log(`[TransactionService] Transaction rejected: ${transactionId}, reason: ${reason}`);
        this.notificationService.warning('Transaction rejected');
        this.updateTransactionInList(updatedTransaction);
      }),
      catchError(error => {
        console.error('[TransactionService] Error rejecting transaction:', error);
        this.setError('Failed to reject transaction');
        this.notificationService.error('Failed to reject transaction');
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  syncTransactions(): Observable<void> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.syncWithBackend().pipe(
      delay(200),
      tap(() => {
        console.log('[TransactionService] Transactions synced with backend');
        this.notificationService.success('Transactions synchronized');
      }),
      catchError(error => {
        console.error('[TransactionService] Error syncing transactions:', error);
        this.setError('Failed to sync transactions');
        this.notificationService.error('Failed to sync transactions');
        return throwError(() => error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getTransactionById(id: string): Observable<Transaction | null> {
    this.clearError();

    return this.transactionRepository.findById(id).pipe(
      delay(50),
      tap(transaction => {
        if (transaction) {
          this.selectedTransactionSubject.next(transaction);
          console.log(`[TransactionService] Transaction loaded: ${id}`);
        } else {
          console.warn(`[TransactionService] Transaction not found: ${id}`);
        }
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting transaction:', error);
        this.setError('Failed to get transaction');
        return of(null);
      })
    );
  }

  getPendingTransactions(batchSize: number = 10): Observable<Transaction[]> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findPendingTransactions(batchSize).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Found ${transactions.length} pending transactions`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting pending transactions:', error);
        this.setError('Failed to get pending transactions');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getTransactionsByType(accountId: string, type: TransactionType): Observable<Transaction[]> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findByType(accountId, type).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Found ${transactions.length} transactions of type ${type}`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting transactions by type:', error);
        this.setError('Failed to get transactions by type');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getTransactionsByDateRange(accountId: string, startDate: Date, endDate: Date): Observable<Transaction[]> {
    this.setLoading(true);
    this.clearError();

    return this.transactionRepository.findByDateRange(accountId, startDate, endDate).pipe(
      delay(100),
      tap(transactions => {
        console.log(`[TransactionService] Found ${transactions.length} transactions in date range`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting transactions by date range:', error);
        this.setError('Failed to get transactions by date range');
        return of([]);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getBalanceImpact(accountId: string): Observable<number> {
    return this.transactionRepository.getBalanceImpact(accountId).pipe(
      delay(50),
      tap(impact => {
        console.log(`[TransactionService] Balance impact for account ${accountId}: ${impact}`);
      }),
      catchError(error => {
        console.error('[TransactionService] Error getting balance impact:', error);
        return of(0);
      })
    );
  }

  clearSelectedTransaction(): void {
    this.selectedTransactionSubject.next(null);
  }

  clearTransactions(): void {
    this.transactionsSubject.next([]);
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private setError(message: string): void {
    this.errorSubject.next(message);
  }

  private clearError(): void {
    this.errorSubject.next(null);
  }

  private addTransactionToList(transaction: Transaction): void {
    const currentTransactions = this.transactionsSubject.value;
    this.transactionsSubject.next([transaction, ...currentTransactions]);
  }

  private updateTransactionInList(updatedTransaction: Transaction): void {
    const currentTransactions = this.transactionsSubject.value;
    const updatedList = currentTransactions.map(tx => 
      tx.id === updatedTransaction.id ? updatedTransaction : tx
    );
    this.transactionsSubject.next(updatedList);

    if (this.selectedTransactionSubject.value?.id === updatedTransaction.id) {
      this.selectedTransactionSubject.next(updatedTransaction);
    }
  }
}