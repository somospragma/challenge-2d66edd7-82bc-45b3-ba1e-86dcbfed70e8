import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, asyncScheduler, observeOn } from 'rxjs';
import { catchError, map, retry, shareReplay, timeout } from 'rxjs/operators';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionStatus, TransactionType } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';

export interface TransactionFilter {
  accountId?: string;
  status?: TransactionStatus;
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface TransactionBatchRequest {
  transactionIds: string[];
  action: 'approve' | 'reject' | 'process';
  reason?: string;
}

export interface TransactionBatchResult {
  successful: string[];
  failed: { id: string; error: string }[];
  processedAt: Date;
}

export interface TransactionSyncResult {
  uploaded: number;
  downloaded: number;
  conflicts: { localId: string; serverVersion: Transaction }[];
  lastSyncTimestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionRemoteDatasource {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.banking-app.example.com/v1';
  private readonly cache = new Map<string, { data: any; timestamp: number }>();
  private readonly cacheTimeout = 5 * 60 * 1000;

  private readonly connectionStatus$ = new BehaviorSubject<boolean>(true);
  readonly online$ = this.connectionStatus$.asObservable().pipe(
    observeOn(asyncScheduler)
  );

  constructor() {
    this.initializeNetworkMonitoring();
  }

  private initializeNetworkMonitoring(): void {
    if (typeof window !== 'undefined' && 'onLine' in navigator) {
      this.connectionStatus$.next(navigator.onLine);
      window.addEventListener('online', () => this.connectionStatus$.next(true));
      window.addEventListener('offline', () => this.connectionStatus$.next(false));
    }
  }

  getTransactionById(id: string): Observable<Transaction> {
    const cacheKey = `transaction_${id}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return new Observable(subscriber => {
        subscriber.next(cached);
        subscriber.complete();
      });
    }

    return this.http.get<TransactionModel>(`${this.baseUrl}/transactions/${id}`)
      .pipe(
        map(response => this.mapToEntity(response)),
        retry({ count: 3, delay: 1000 }),
        timeout(10000),
        catchError(error => this.handleError(error, `getTransactionById:${id}`)),
        tap(transaction => this.setCache(cacheKey, transaction)),
        shareReplay(1)
      );
  }

  getTransactionsByAccountId(
    accountId: string,
    page: number = 1,
    pageSize: number = 20,
    filter?: TransactionFilter
  ): Observable<PaginatedResult<Transaction>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      if (filter.status) params = params.set('status', filter.status);
      if (filter.type) params = params.set('type', filter.type);
      if (filter.startDate) params = params.set('startDate', filter.startDate.toISOString());
      if (filter.endDate) params = params.set('endDate', filter.endDate.toISOString());
      if (filter.minAmount) params = params.set('minAmount', filter.minAmount.toString());
      if (filter.maxAmount) params = params.set('maxAmount', filter.maxAmount.toString());
    }

    return this.http.get<PaginatedResult<TransactionModel>>(
      `${this.baseUrl}/accounts/${accountId}/transactions`,
      { params }
    ).pipe(
      map(response => ({
        ...response,
        data: response.data.map(t => this.mapToEntity(t))
      })),
      timeout(15000),
      catchError(error => this.handleError(error, `getTransactionsByAccountId:${accountId}`))
    );
  }

  createTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    const payload = this.mapToModel(transaction);
    return this.http.post<TransactionModel>(
      `${this.baseUrl}/transactions`,
      payload
    ).pipe(
      map(response => this.mapToEntity(response)),
      timeout(10000),
      catchError(error => this.handleError(error, 'createTransaction'))
    );
  }

  updateTransactionStatus(
    id: string,
    newStatus: TransactionStatus,
    reason?: string
  ): Observable<Transaction> {
    const body = {
      status: newStatus,
      reason: reason || '',
      updatedAt: new Date().toISOString()
    };

    return this.http.patch<TransactionModel>(
      `${this.baseUrl}/transactions/${id}/status`,
      body
    ).pipe(
      map(response => this.mapToEntity(response)),
      timeout(8000),
      catchError(error => this.handleError(error, `updateTransactionStatus:${id}`))
    );
  }

  getPendingTransactions(batchSize: number = 50): Observable<Transaction[]> {
    const params = new HttpParams()
      .set('status', TransactionStatus.PENDING)
      .set('batchSize', batchSize.toString())
      .set('sortBy', 'createdAt')
      .set('sortOrder', 'asc');

    return this.http.get<TransactionModel[]>(
      `${this.baseUrl}/transactions/pending`,
      { params }
    ).pipe(
      map(transactions => transactions.map(t => this.mapToEntity(t))),
      timeout(20000),
      catchError(error => this.handleError(error, 'getPendingTransactions'))
    );
  }

  processBatchTransactions(request: TransactionBatchRequest): Observable<TransactionBatchResult> {
    return this.http.post<TransactionBatchResult>(
      `${this.baseUrl}/transactions/batch`,
      request
    ).pipe(
      timeout(60000),
      catchError(error => this.handleError(error, 'processBatchTransactions'))
    );
  }

  syncTransactions(
    lastSyncTimestamp: Date,
    localTransactions: Transaction[]
  ): Observable<TransactionSyncResult> {
    const body = {
      lastSyncTimestamp: lastSyncTimestamp.toISOString(),
      localTransactions: localTransactions.map(t => this.mapToModel(t))
    };

    return this.http.post<TransactionSyncResult>(
      `${this.baseUrl}/transactions/sync`,
      body
    ).pipe(
      timeout(30000),
      catchError(error => this.handleError(error, 'syncTransactions'))
    );
  }

  searchTransactions(
    query: string,
    filters?: TransactionFilter,
    page: number = 1,
    pageSize: number = 20
  ): Observable<PaginatedResult<Transaction>> {
    let params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      if (filters.accountId) params = params.set('accountId', filters.accountId);
      if (filters.status) params = params.set('status', filters.status);
    }

    return this.http.get<PaginatedResult<TransactionModel>>(
      `${this.baseUrl}/transactions/search`,
      { params }
    ).pipe(
      map(response => ({
        ...response,
        data: response.data.map(t => this.mapToEntity(t))
      })),
      timeout(15000),
      catchError(error => this.handleError(error, 'searchTransactions'))
    );
  }

  exportTransactions(
    accountId: string,
    format: 'csv' | 'json' | 'pdf',
    dateRange?: { start: Date; end: Date }
  ): Observable<Blob> {
    let params = new HttpParams()
      .set('format', format);

    if (dateRange) {
      params = params
        .set('startDate', dateRange.start.toISOString())
        .set('endDate', dateRange.end.toISOString());
    }

    return this.http.get(
      `${this.baseUrl}/accounts/${accountId}/transactions/export`,
      {
        params,
        responseType: 'blob'
      }
    ).pipe(
      timeout(60000),
      catchError(error => this.handleError(error, 'exportTransactions'))
    );
  }

  private mapToEntity(model: TransactionModel): Transaction {
    const TransactionEntity = require('../../domain/entities/transaction.entity').Transaction;
    const TransactionStatusEntity = require('../../domain/entities/transaction.entity').TransactionStatus;
    const TransactionTypeEntity = require('../../domain/entities/transaction.entity').TransactionType;

    return new TransactionEntity(
      model.id,
      model.accountId,
      model.amount,
      model.currency,
      TransactionTypeEntity[model.type] || TransactionTypeEntity.TRANSFER,
      TransactionStatusEntity[model.status] || TransactionStatusEntity.PENDING,
      model.description,
      model.counterpartyId,
      model.counterpartyName,
      model.metadata,
      model.createdAt,
      model.updatedAt,
      model.version
    );
  }

  private mapToModel(entity: Partial<Transaction>): any {
    return {
      id: entity.id,
      accountId: entity.accountId,
      amount: entity.amount,
      currency: entity.currency,
      type: entity.type ? entity.type.toString() : 'TRANSFER',
      status: entity.status ? entity.status.toString() : 'PENDING',
      description: entity.description,
      counterpartyId: entity.counterpartyId,
      counterpartyName: entity.counterpartyName,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }

  private handleError(error: HttpErrorResponse, operation: string): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error de red: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'No hay conexión con el servidor. Verifique su conexión a internet.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud inválida';
          break;
        case 401:
          errorMessage = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
          break;
        case 403:
          errorMessage = 'No tiene permiso para realizar esta operación';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 409:
          errorMessage = 'Conflicto de datos. La información fue modificada por otro proceso.';
          break;
        case 422:
          errorMessage = error.error?.message || 'Datos inválidos';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Espere un momento e intente nuevamente.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        case 503:
          errorMessage = 'Servicio temporalmente no disponible';
          break;
        default:
          errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }
    }

    console.error(`[TransactionRemoteDatasource] ${operation} falló:`, error);
    return throwError(() => new Error(errorMessage));
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

import { tap } from 'rxjs/operators';