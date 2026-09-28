export interface AccountModel {
  id: string;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  currency: string;
  status: AccountStatus;
  holderName: string;
  holderId: string;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date | null;
  version: number;
  pendingOperations: number;
  overdraftLimit: number;
  branchCode: string;
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
  CREDIT = 'CREDIT'
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  CLOSED = 'CLOSED'
}

export interface AccountBalance {
  available: number;
  pending: number;
  total: number;
  currency: string;
  asOf: Date;
}

export interface AccountCreateRequest {
  accountType: AccountType;
  holderName: string;
  holderId: string;
  initialDeposit: number;
  currency: string;
  branchCode: string;
}

export interface AccountUpdateRequest {
  status?: AccountStatus;
  overdraftLimit?: number;
  holderName?: string;
}

export class AccountModelMapper {
  static toDomain(model: AccountModel): import('../../domain/entities/account.entity').Account {
    const AccountEntity = require('../../domain/entities/account.entity').Account;
    const AccountStatusEntity = require('../../domain/entities/account.entity').AccountStatus;
    return new AccountEntity(
      model.id,
      model.accountNumber,
      model.accountType as any,
      model.balance,
      model.currency,
      AccountStatusEntity[model.status] || AccountStatusEntity.ACTIVE,
      model.holderName,
      model.holderId,
      model.createdAt,
      model.updatedAt,
      model.version
    );
  }

  static toPersistence(entity: import('../../domain/entities/account.entity').Account): AccountModel {
    return {
      id: entity.id,
      accountNumber: entity.accountNumber,
      accountType: entity.accountType as unknown as AccountType,
      balance: entity.balance,
      currency: entity.currency,
      status: entity.status as unknown as AccountStatus,
      holderName: entity.holderName,
      holderId: entity.holderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      lastSyncedAt: new Date(),
      version: entity.version,
      pendingOperations: 0,
      overdraftLimit: 0,
      branchCode: 'DEFAULT'
    };
  }

  static toBalance(entity: import('../../domain/entities/account.entity').Account): AccountBalance {
    return {
      available: entity.balance,
      pending: 0,
      total: entity.balance,
      currency: entity.currency,
      asOf: new Date()
    };
  }
}