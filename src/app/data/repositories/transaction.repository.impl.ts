import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, map, catchError, tap, switchMap } from 'rxjs/operators';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus } from '../../domain/entities/transaction.entity';
import { TransactionLocalDatasource } from '../datasources/transaction.local.datasource';
import { TransactionRemoteDatasource } from '../datasources/transaction.remote.datasource';

@Injectable({
  providedIn: 'root'
})
export class TransactionRepositoryImpl implements TransactionRepository {
  private transactionsStorage: Map<string, Transaction> = new Map();
  private syncInProgress = false;
  private pendingSyncCount = new BehaviorSubject<number>(0);
  private readonly STORAGE_KEY = 'ionic_banking_transactions';

  constructor(
    private localDatasource: TransactionLocalDatasource,
    private remoteDatasource: TransactionRemoteDatasource
  ) {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const transactionsData = JSON.parse(stored);
        transactionsData.forEach((txData: any) => {
          const transaction = this.reconstructTransaction(txData);
          this.transactionsStorage.set(transaction.id, transaction);
        });
      }
    } catch (error) {
      console.error('[TransactionRepositoryImpl] Error initializing from storage:', error);
    }
  }

  private reconstructTransaction(data: any): Transaction {
    const transaction = new Transaction(
      data.id,
      data.accountId,
      data.amount,
      data.type,
      data.status,
      data.description,
      data.counterpartyId,
      data.counterpartyName,
      data.category,
      data.metadata,
      data.createdAt,
      data.updatedAt
    );
    return transaction;
  }

  private persistToStorage(): void {
    try {
      const transactionsArray = Array.from(this.transactionsStorage.values()).map(tx => ({
        id: tx.id,
        accountId: tx.accountId,
        amount: tx.amount,
        type: tx.type,
        status: tx.status,
        description: tx.description,
        counterpartyId: tx.counterpartyId,
        counterpartyName: tx.counterpartyName,
        category: tx.category,
        metadata: tx.metadata,
        createdAt: tx.createdAt,
        updatedAt: tx.updatedAt
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactionsArray));
    } catch (error) {
      console.error('[TransactionRepositoryImpl] Error persisting to storage:', error);
    }
  }

  save(transaction: Transaction): Observable<Transaction> {
    if (!transaction || !transaction.id) {
      return throwError(() => new Error('[TransactionRepositoryImpl] Transaction or transaction ID is required'));
    }

    const existing = this.transactionsStorage.get(transaction.id);
    if (existing) {
      console.log(`[TransactionRepositoryImpl] Updating existing transaction: ${transaction.id}`);
    } else {
      console.log(`[TransactionRepositoryImpl] Creating new transaction: ${transaction.id}`);
    }

    this.transactionsStorage.set(transaction.id, transaction);
    this.persistToStorage();
    this.pendingSyncCount.next(this.pendingSyncCount.value + 1);

    return of(transaction).pipe(delay(10));
  }

  findById(id: string): Observable<Transaction | null> {
    const transaction = this.transactionsStorage.get(id) || null;
    if (!transaction) {
      console.warn(`[TransactionRepositoryImpl] Transaction not found: ${id}`);
    }
    return of(transaction).pipe(delay(10));
  }

  findByAccountId(accountId: string, limit: number = 50, offset: number = 0): Observable<Transaction[]> {
    const allTransactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.accountId === accountId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const paginatedTransactions = allTransactions.slice(offset, offset + limit);
    return of(paginatedTransactions).pipe(delay(10));
  }

  findPendingTransactions(batchSize: number): Observable<Transaction[]> {
    const pendingTransactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.status === TransactionStatus.PENDING && tx.isProcessable())
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, batchSize);

    console.log(`[TransactionRepositoryImpl] Found ${pendingTransactions.length} pending transactions`);
    return of(pendingTransactions).pipe(delay(10));
  }

  updateStatus(id: string, newStatus: string): Observable<Transaction> {
    const transaction = this.transactionsStorage.get(id);
    
    if (!transaction) {
      return throwError(() => new Error(`[TransactionRepositoryImpl] Transaction not found: ${id}`));
    }

    const updatedTransaction = transaction.withStatus(newStatus as TransactionStatus);
    this.transactionsStorage.set(id, updatedTransaction);
    this.persistToStorage();
    
    console.log(`[TransactionRepositoryImpl] Status updated for transaction ${id}: ${newStatus}`);
    return of(updatedTransaction).pipe(delay(10));
  }

  syncWithBackend(): Observable<void> {
    if (this.syncInProgress) {
      console.warn('[TransactionRepositoryImpl] Sync already in progress');
      return of(void 0);
    }

    this.syncInProgress = true;
    console.log('[TransactionRepositoryImpl] Starting sync with backend');

    return this.remoteDatasource.fetchAll().pipe(
      delay(100),
      tap(remoteTransactions => {
        console.log(`[TransactionRepositoryImpl] Received ${remoteTransactions.length} transactions from backend`);
        
        remoteTransactions.forEach(remoteTx => {
          const localTx = this.transactionsStorage.get(remoteTx.id);
          
          if (!localTx) {
            this.transactionsStorage.set(remoteTx.id, remoteTx);
          } else if (new Date(remoteTx.updatedAt) > new Date(localTx.updatedAt)) {
            this.transactionsStorage.set(remoteTx.id, remoteTx);
          }
        });
        
        this.persistToStorage();
        this.pendingSyncCount.next(0);
      }),
      map(() => {
        this.syncInProgress = false;
        console.log('[TransactionRepositoryImpl] Sync completed successfully');
      }),
      catchError(error => {
        this.syncInProgress = false;
        console.error('[TransactionRepositoryImpl] Sync failed:', error);
        return throwError(() => error);
      })
    );
  }

  getPendingSyncCount(): Observable<number> {
    return this.pendingSyncCount.asObservable();
  }

  findByDateRange(accountId: string, startDate: Date, endDate: Date): Observable<Transaction[]> {
    const transactions = Array.from(this.transactionsStorage.values())
      .filter(tx => {
        const txDate = new Date(tx.createdAt);
        return tx.accountId === accountId && 
               txDate >= startDate && 
               txDate <= endDate;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return of(transactions).pipe(delay(10));
  }

  findByType(accountId: string, type: string): Observable<Transaction[]> {
    const transactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.accountId === accountId && tx.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return of(transactions).pipe(delay(10));
  }

  delete(id: string): Observable<boolean> {
    const existed = this.transactionsStorage.has(id);
    if (existed) {
      this.transactionsStorage.delete(id);
      this.persistToStorage();
      console.log(`[TransactionRepositoryImpl] Transaction deleted: ${id}`);
    }
    return of(existed).pipe(delay(10));
  }

  count(): Observable<number> {
    return of(this.transactionsStorage.size).pipe(delay(10));
  }

  getBalanceImpact(accountId: string): Observable<number> {
    const transactions = Array.from(this.transactionsStorage.values())
      .filter(tx => tx.accountId === accountId && tx.status === TransactionStatus.COMPLETED);

    const totalImpact = transactions.reduce((sum, tx) => sum + tx.calculateBalanceImpact(), 0);
    return of(totalImpact).pipe(delay(10));
  }
}