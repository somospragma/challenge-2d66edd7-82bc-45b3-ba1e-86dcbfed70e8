import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Account } from '../../domain/entities/account.entity';
import { AccountStatus } from '../../domain/entities/account.entity';

@Injectable({
  providedIn: 'root'
})
export class AccountLocalDatasource {
  private accountsStorage: Map<string, Account> = new Map();
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  private readonly STORAGE_KEY = 'ionic_banking_accounts';
  private initialized = false;

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    if (this.initialized) return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const accountsData = JSON.parse(stored);
        accountsData.forEach((acc: any) => {
          const account = this.reconstructAccount(acc);
          this.accountsStorage.set(account.id, account);
        });
        this.accountsSubject.next(Array.from(this.accountsStorage.values()));
      }
      this.initialized = true;
    } catch (error) {
      console.error('[AccountLocalDatasource] Error initializing from storage:', error);
      this.initialized = true;
    }
  }

  private reconstructAccount(data: any): Account {
    const account = new Account(
      data.id,
      data.accountNumber,
      data.balance,
      data.accountType,
      data.status,
      data.customerId,
      data.currency,
      data.createdAt,
      data.updatedAt
    );
    return account;
  }

  private persistToStorage(): void {
    try {
      const accountsArray = Array.from(this.accountsStorage.values()).map(acc => ({
        id: acc.id,
        accountNumber: acc.accountNumber,
        balance: acc.balance,
        accountType: acc.accountType,
        status: acc.status,
        customerId: acc.customerId,
        currency: acc.currency,
        createdAt: acc.createdAt,
        updatedAt: acc.updatedAt
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(accountsArray));
      this.accountsSubject.next(Array.from(this.accountsStorage.values()));
    } catch (error) {
      console.error('[AccountLocalDatasource] Error persisting to storage:', error);
    }
  }

  findById(id: string): Observable<Account | null> {
    return of(this.accountsStorage.get(id) || null).pipe(
      delay(10),
      map(account => {
        if (!account) {
          console.warn(`[AccountLocalDatasource] Account not found: ${id}`);
        }
        return account;
      })
    );
  }

  findByCustomerId(customerId: string): Observable<Account[]> {
    const accounts = Array.from(this.accountsStorage.values())
      .filter(acc => acc.customerId === customerId);
    return of(accounts).pipe(delay(10));
  }

  findAll(): Observable<Account[]> {
    return this.accountsSubject.asObservable().pipe(delay(10));
  }

  save(account: Account): Observable<Account> {
    if (!account || !account.id) {
      return throwError(() => new Error('[AccountLocalDatasource] Account or account ID is required'));
    }

    const existing = this.accountsStorage.get(account.id);
    if (existing) {
      console.log(`[AccountLocalDatasource] Updating existing account: ${account.id}`);
    } else {
      console.log(`[AccountLocalDatasource] Creating new account: ${account.id}`);
    }

    this.accountsStorage.set(account.id, account);
    this.persistToStorage();
    return of(account).pipe(delay(10));
  }

  updateBalance(accountId: string, newBalance: number): Observable<Account> {
    const account = this.accountsStorage.get(accountId);
    
    if (!account) {
      return throwError(() => new Error(`[AccountLocalDatasource] Account not found: ${accountId}`));
    }

    if (newBalance < 0 && !account.hasSufficientFunds(Math.abs(newBalance))) {
      return throwError(() => new Error('[AccountLocalDatasource] Insufficient funds'));
    }

    const updatedAccount = account.adjustBalance(newBalance);
    this.accountsStorage.set(accountId, updatedAccount);
    this.persistToStorage();
    
    console.log(`[AccountLocalDatasource] Balance updated for account ${accountId}: ${newBalance}`);
    return of(updatedAccount).pipe(delay(10));
  }

  updateStatus(accountId: string, newStatus: AccountStatus): Observable<Account> {
    const account = this.accountsStorage.get(accountId);
    
    if (!account) {
      return throwError(() => new Error(`[AccountLocalDatasource] Account not found: ${accountId}`));
    }

    const updatedAccount = account.withStatus(newStatus);
    this.accountsStorage.set(accountId, updatedAccount);
    this.persistToStorage();
    
    console.log(`[AccountLocalDatasource] Status updated for account ${accountId}: ${newStatus}`);
    return of(updatedAccount).pipe(delay(10));
  }

  delete(id: string): Observable<boolean> {
    const existed = this.accountsStorage.has(id);
    if (existed) {
      this.accountsStorage.delete(id);
      this.persistToStorage();
      console.log(`[AccountLocalDatasource] Account deleted: ${id}`);
    }
    return of(existed).pipe(delay(10));
  }

  findByAccountNumber(accountNumber: string): Observable<Account | null> {
    const account = Array.from(this.accountsStorage.values())
      .find(acc => acc.accountNumber === accountNumber) || null;
    return of(account).pipe(delay(10));
  }

  exists(id: string): Observable<boolean> {
    return of(this.accountsStorage.has(id)).pipe(delay(10));
  }

  clear(): Observable<void> {
    this.accountsStorage.clear();
    localStorage.removeItem(this.STORAGE_KEY);
    this.accountsSubject.next([]);
    console.log('[AccountLocalDatasource] All accounts cleared');
    return of(void 0).pipe(delay(10));
  }

  count(): Observable<number> {
    return of(this.accountsStorage.size).pipe(delay(10));
  }
}