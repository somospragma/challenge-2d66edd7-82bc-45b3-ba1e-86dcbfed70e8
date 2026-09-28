import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../entities/account.entity';
import { AccountStatus } from '../entities/account.entity';

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account[]>;
  save(account: Account): Promise<Account>;
  updateStatus(id: string, status: AccountStatus): Promise<Account>;
  updateBalance(id: string, newBalance: number): Promise<Account>;
  findActiveAccounts(customerId: string): Promise<Account[]>;
  syncWithBackend(): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class AccountRepositoryBase implements AccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract findByCustomerId(customerId: string): Promise<Account[]>;
  abstract save(account: Account): Promise<Account>;
  abstract updateStatus(id: string, status: AccountStatus): Promise<Account>;
  abstract updateBalance(id: string, newBalance: number): Promise<Account>;
  abstract findActiveAccounts(customerId: string): Promise<Account[]>;
  abstract syncWithBackend(): Promise<void>;
}