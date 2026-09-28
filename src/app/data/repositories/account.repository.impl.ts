import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { Account } from '../../domain/entities/account.entity';
import { AccountStatus } from '../../domain/entities/account.entity';
import { AccountLocalDatasource } from '../datasources/account.local.datasource';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryImpl implements AccountRepository {
  private syncInProgress = false;

  constructor(private localDatasource: AccountLocalDatasource) {}

  findById(id: string): Observable<Account | null> {
    return this.localDatasource.findById(id).pipe(
      delay(10),
      tap(account => {
        if (account) {
          console.log(`[AccountRepositoryImpl] Found account: ${id}`);
        }
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error finding account ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  findByCustomerId(customerId: string): Observable<Account[]> {
    return this.localDatasource.findByCustomerId(customerId).pipe(
      delay(10),
      tap(accounts => {
        console.log(`[AccountRepositoryImpl] Found ${accounts.length} accounts for customer: ${customerId}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error finding accounts for customer ${customerId}:`, error);
        return throwError(() => error);
      })
    );
  }

  findAll(): Observable<Account[]> {
    return this.localDatasource.findAll().pipe(
      delay(10),
      tap(accounts => {
        console.log(`[AccountRepositoryImpl] Found ${accounts.length} total accounts`);
      }),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error finding all accounts:', error);
        return throwError(() => error);
      })
    );
  }

  save(account: Account): Observable<Account> {
    if (!account || !account.id) {
      return throwError(() => new Error('[AccountRepositoryImpl] Account or account ID is required'));
    }

    return this.localDatasource.save(account).pipe(
      delay(10),
      tap(savedAccount => {
        console.log(`[AccountRepositoryImpl] Account saved: ${savedAccount.id}`);
      }),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error saving account:', error);
        return throwError(() => error);
      })
    );
  }

  updateBalance(accountId: string, newBalance: number): Observable<Account> {
    if (newBalance < 0) {
      return throwError(() => new Error('[AccountRepositoryImpl] Balance cannot be negative'));
    }

    return this.localDatasource.updateBalance(accountId, newBalance).pipe(
      delay(10),
      tap(updatedAccount => {
        console.log(`[AccountRepositoryImpl] Balance updated for account ${accountId}: ${newBalance}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error updating balance for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  updateStatus(accountId: string, newStatus: AccountStatus): Observable<Account> {
    return this.localDatasource.updateStatus(accountId, newStatus).pipe(
      delay(10),
      tap(updatedAccount => {
        console.log(`[AccountRepositoryImpl] Status updated for account ${accountId}: ${newStatus}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error updating status for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  delete(id: string): Observable<boolean> {
    return this.localDatasource.delete(id).pipe(
      delay(10),
      tap(existed => {
        if (existed) {
          console.log(`[AccountRepositoryImpl] Account deleted: ${id}`);
        } else {
          console.warn(`[AccountRepositoryImpl] Account not found for deletion: ${id}`);
        }
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error deleting account ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  findByAccountNumber(accountNumber: string): Observable<Account | null> {
    return this.localDatasource.findByAccountNumber(accountNumber).pipe(
      delay(10),
      tap(account => {
        if (account) {
          console.log(`[AccountRepositoryImpl] Found account by account number: ${accountNumber}`);
        } else {
          console.warn(`[AccountRepositoryImpl] Account not found by account number: ${accountNumber}`);
        }
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error finding account by account number ${accountNumber}:`, error);
        return throwError(() => error);
      })
    );
  }

  exists(id: string): Observable<boolean> {
    return this.localDatasource.exists(id).pipe(
      delay(10),
      tap(exists => {
        console.log(`[AccountRepositoryImpl] Account ${id} exists: ${exists}`);
      }),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error checking if account ${id} exists:`, error);
        return throwError(() => error);
      })
    );
  }

  hasSufficientFunds(accountId: string, amount: number): Observable<boolean> {
    return this.findById(accountId).pipe(
      map(account => {
        if (!account) {
          throw new Error(`[AccountRepositoryImpl] Account not found: ${accountId}`);
        }
        return account.hasSufficientFunds(amount);
      }),
      delay(10),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error checking funds for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  adjustBalance(accountId: string, amount: number): Observable<Account> {
    return this.findById(accountId).pipe(
      map(account => {
        if (!account) {
          throw new Error(`[AccountRepositoryImpl] Account not found: ${accountId}`);
        }
        if (!account.isActive()) {
          throw new Error(`[AccountRepositoryImpl] Account ${accountId} is not active`);
        }
        if (amount < 0 && !account.hasSufficientFunds(Math.abs(amount))) {
          throw new Error(`[AccountRepositoryImpl] Insufficient funds in account ${accountId}`);
        }
        return account.adjustBalance(amount);
      }),
      switchMap(updatedAccount => this.save(updatedAccount)),
      delay(10),
      catchError(error => {
        console.error(`[AccountRepositoryImpl] Error adjusting balance for account ${accountId}:`, error);
        return throwError(() => error);
      })
    );
  }

  count(): Observable<number> {
    return this.localDatasource.count().pipe(
      delay(10),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error counting accounts:', error);
        return throwError(() => error);
      })
    );
  }

  clear(): Observable<void> {
    return this.localDatasource.clear().pipe(
      delay(10),
      tap(() => {
        console.log('[AccountRepositoryImpl] All accounts cleared');
      }),
      catchError(error => {
        console.error('[AccountRepositoryImpl] Error clearing accounts:', error);
        return throwError(() => error);
      })
    );
  }
}