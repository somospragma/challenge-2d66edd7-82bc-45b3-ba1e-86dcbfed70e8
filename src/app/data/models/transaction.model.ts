import { TransactionType, TransactionStatus, TransactionMetadata } from '../../domain/entities/transaction.entity';

export interface TransactionModel {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: TransactionMetadata;
  processedAt?: Date;
  failureReason?: string;
  retryCount: number;
  externalReference?: string;
  merchantId?: string;
  category?: string;
  location?: string;
  ipAddress?: string;
  deviceId?: string;
}

export interface TransactionModelMapper {
  toDomain(model: TransactionModel): import('../../domain/entities/transaction.entity').Transaction;
  toModel(entity: import('../../domain/entities/transaction.entity').Transaction): TransactionModel;
}

export class TransactionModelImpl implements TransactionModel {
  constructor(
    public id: string,
    public accountId: string,
    public amount: number,
    public type: TransactionType,
    public status: TransactionStatus,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public metadata: TransactionMetadata,
    public processedAt?: Date,
    public failureReason?: string,
    public retryCount: number = 0,
    public externalReference?: string,
    public merchantId?: string,
    public category?: string,
    public location?: string,
    public ipAddress?: string,
    public deviceId?: string
  ) {}

  static fromJson(json: Record<string, unknown>): TransactionModelImpl {
    return new TransactionModelImpl(
      json['id'] as string,
      json['accountId'] as string,
      json['amount'] as number,
      json['type'] as TransactionType,
      json['status'] as TransactionStatus,
      json['description'] as string,
      new Date(json['createdAt'] as string),
      new Date(json['updatedAt'] as string),
      (json['metadata'] as TransactionMetadata) || {},
      json['processedAt'] ? new Date(json['processedAt'] as string) : undefined,
      json['failureReason'] as string | undefined,
      (json['retryCount'] as number) || 0,
      json['externalReference'] as string | undefined,
      json['merchantId'] as string | undefined,
      json['category'] as string | undefined,
      json['location'] as string | undefined,
      json['ipAddress'] as string | undefined,
      json['deviceId'] as string | undefined
    );
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      accountId: this.accountId,
      amount: this.amount,
      type: this.type,
      status: this.status,
      description: this.description,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      metadata: this.metadata,
      processedAt: this.processedAt?.toISOString(),
      failureReason: this.failureReason,
      retryCount: this.retryCount,
      externalReference: this.externalReference,
      merchantId: this.merchantId,
      category: this.category,
      location: this.location,
      ipAddress: this.ipAddress,
      deviceId: this.deviceId
    };
  }

  isPending(): boolean {
    return this.status === TransactionStatus.PENDING;
  }

  isCompleted(): boolean {
    return this.status === TransactionStatus.COMPLETED;
  }

  isFailed(): boolean {
    return this.status === TransactionStatus.FAILED || this.status === TransactionStatus.REJECTED;
  }

  canRetry(): boolean {
    return this.isFailed() && this.retryCount < 3;
  }

  canBeCancelled(): boolean {
    return this.isPending() && this.retryCount === 0;
  }

  getAgeInMinutes(): number {
    const now = new Date().getTime();
    const createdTime = this.createdAt.getTime();
    return Math.floor((now - createdTime) / (1000 * 60));
  }

  getAgeInSeconds(): number {
    const now = new Date().getTime();
    const createdTime = this.createdAt.getTime();
    return Math.floor((now - createdTime) / 1000);
  }

  isStale(thresholdMinutes: number = 30): boolean {
    return this.isPending() && this.getAgeInMinutes() > thresholdMinutes;
  }

  withUpdatedStatus(newStatus: TransactionStatus): TransactionModelImpl {
    return new TransactionModelImpl(
      this.id,
      this.accountId,
      this.amount,
      this.type,
      newStatus,
      this.description,
      this.createdAt,
      new Date(),
      this.metadata,
      newStatus === TransactionStatus.COMPLETED ? new Date() : this.processedAt,
      this.failureReason,
      this.retryCount,
      this.externalReference,
      this.merchantId,
      this.category,
      this.location,
      this.ipAddress,
      this.deviceId
    );
  }

  withIncrementedRetry(): TransactionModelImpl {
    return new TransactionModelImpl(
      this.id,
      this.accountId,
      this.amount,
      this.type,
      this.status,
      this.description,
      this.createdAt,
      new Date(),
      this.metadata,
      this.processedAt,
      this.failureReason,
      this.retryCount + 1,
      this.externalReference,
      this.merchantId,
      this.category,
      this.location,
      this.ipAddress,
      this.deviceId
    );
  }

  withFailureReason(reason: string): TransactionModelImpl {
    return new TransactionModelImpl(
      this.id,
      this.accountId,
      this.amount,
      this.type,
      TransactionStatus.FAILED,
      this.description,
      this.createdAt,
      new Date(),
      this.metadata,
      this.processedAt,
      reason,
      this.retryCount,
      this.externalReference,
      this.merchantId,
      this.category,
      this.location,
      this.ipAddress,
      this.deviceId
    );
  }
}

export const TransactionModelToEntityMapper: TransactionModelMapper = {
  toDomain(model: TransactionModel) {
    return new Transaction(
      model.id,
      model.accountId,
      model.amount,
      model.type,
      model.status,
      model.description,
      model.createdAt,
      model.updatedAt,
      model.metadata
    );
  },

  toModel(entity: import('../../domain/entities/transaction.entity').Transaction) {
    return new TransactionModelImpl(
      entity.id,
      entity.accountId,
      entity.amount,
      entity.type,
      entity.status,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
      entity.metadata
    );
  }
};