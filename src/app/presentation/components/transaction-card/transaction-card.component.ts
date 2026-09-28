import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonLabel, IonBadge, IonButton, IonNote } from '@ionic/angular/standalone';
import { Transaction, TransactionStatus, TransactionType } from '../../../domain/entities/transaction.entity';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    IonLabel,
    IonBadge,
    IonButton,
    IonNote
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="transaction-card" [class]="getStatusClass()">
      <div class="transaction-icon">
        <ion-icon [name]="getTypeIcon()" size="large"></ion-icon>
      </div>
      
      <div class="transaction-details">
        <div class="transaction-header">
          <ion-label class="transaction-type">{{ getTypeLabel() }}</ion-label>
          <ion-badge [color]="getStatusColor()" class="status-badge">
            {{ getStatusLabel() }}
          </ion-badge>
        </div>
        
        <ion-label class="transaction-description" *ngIf="transaction.description">
          {{ transaction.description }}
        </ion-label>
        
        <div class="transaction-meta">
          <ion-note class="transaction-date">
            <ion-icon name="calendar-outline"></ion-icon>
            {{ formatDate(transaction.createdAt) }}
          </ion-note>
          <ion-note class="transaction-id" *ngIf="showTransactionId">
            <ion-icon name="hash-outline"></ion-icon>
            {{ truncateId(transaction.id) }}
          </ion-note>
        </div>
        
        <div class="transaction-category" *ngIf="transaction.metadata?.category">
          <ion-badge color="light">
            {{ transaction.metadata.category }}
          </ion-badge>
        </div>
      </div>
      
      <div class="transaction-amount" [class]="getAmountClass()">
        <span class="amount-sign">{{ getAmountSign() }}</span>
        <span class="amount-value">{{ formatAmount(transaction.amount) }}</span>
        <span class="amount-currency">{{ transaction.currency || 'USD' }}</span>
      </div>
      
      <div class="transaction-actions" *ngIf="showActions && transaction.status === 'FAILED'">
        <ion-button
          fill="clear"
          size="small"
          color="primary"
          (click)="onRetry($event)">
          <ion-icon slot="icon-only" name="refresh-outline"></ion-icon>
        </ion-button>
        <ion-button
          fill="clear"
          size="small"
          color="medium"
          (click)="onDetails($event)">
          <ion-icon slot="icon-only" name="chevron-forward-outline"></ion-icon>
        </ion-button>
      </div>
      
      <div class="retry-info" *ngIf="showRetryInfo && transaction.status === 'FAILED'">
        <ion-note color="danger">
          <ion-icon name="warning-outline"></ion-icon>
          {{ transaction.metadata?.retryMessage || 'Transacción fallida. Toca para reintentar.' }}
        </ion-note>
      </div>
    </div>
  `,
  styles: [`
    .transaction-card {
      display: flex;
      align-items: flex-start;
      padding: 12px;
      background: var(--ion-item-background, var(--ion-card-background, #fff));
      border-radius: 12px;
      margin: 8px 0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .transaction-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .transaction-card.status-completed {
      border-left: 4px solid var(--ion-color-success, #2dd36f);
    }
    
    .transaction-card.status-pending {
      border-left: 4px solid var(--ion-color-warning, #ffc409);
    }
    
    .transaction-card.status-failed {
      border-left: 4px solid var(--ion-color-danger, #eb445a);
    }
    
    .transaction-card.status-processing {
      border-left: 4px solid var(--ion-color-tertiary, #3dc2ec);
    }
    
    .transaction-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--ion-color-light, #f4f5f8);
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .transaction-icon ion-icon {
      color: var(--ion-color-primary, #3880ff);
    }
    
    .transaction-details {
      flex: 1;
      min-width: 0;
    }
    
    .transaction-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    
    .transaction-type {
      font-weight: 600;
      font-size: 16px;
      color: var(--ion-text-color, #000);
    }
    
    .status-badge {
      font-size: 10px;
      text-transform: uppercase;
    }
    
    .transaction-description {
      display: block;
      font-size: 14px;
      color: var(--ion-color-medium, #92949c);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .transaction-meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
    }
    
    .transaction-meta ion-note {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
    }
    
    .transaction-category {
      margin-top: 6px;
    }
    
    .transaction-amount {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 12px;
      flex-shrink: 0;
    }
    
    .transaction-amount.positive {
      color: var(--ion-color-success, #2dd36f);
    }
    
    .transaction-amount.negative {
      color: var(--ion-color-danger, #eb445a);
    }
    
    .amount-sign {
      font-size: 14px;
      font-weight: 500;
    }
    
    .amount-value {
      font-size: 18px;
      font-weight: 700;
    }
    
    .amount-currency {
      font-size: 12px;
      opacity: 0.7;
    }
    
    .transaction-actions {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      gap: 4px;
    }
    
    .retry-info {
      width: 100%;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--ion-color-light, #f4f5f8);
    }
  `]
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;
  @Input() showActions = false;
  @Input() showRetryInfo = false;
  @Input() showTransactionId = false;

  @Output() transactionClick = new EventEmitter<Transaction>();
  @Output() retry = new EventEmitter<Transaction>();
  @Output() details = new EventEmitter<Transaction>();

  getTypeIcon(): string {
    const iconMap: Record<TransactionType, string> = {
      [TransactionType.DEPOSIT]: 'arrow-down-circle-outline',
      [TransactionType.WITHDRAWAL]: 'arrow-up-circle-outline',
      [TransactionType.TRANSFER]: 'swap-horizontal-outline',
      [TransactionType.PAYMENT]: 'card-outline',
      [TransactionType.REFUND]: 'return-up-back-outline'
    };
    return iconMap[this.transaction?.type] || 'help-circle-outline';
  }

  getTypeLabel(): string {
    const labelMap: Record<TransactionType, string> = {
      [TransactionType.DEPOSIT]: 'Depósito',
      [TransactionType.WITHDRAWAL]: 'Retiro',
      [TransactionType.TRANSFER]: 'Transferencia',
      [TransactionType.PAYMENT]: 'Pago',
      [TransactionType.REFUND]: 'Reembolso'
    };
    return labelMap[this.transaction?.type] || 'Transacción';
  }

  getStatusColor(): string {
    const colorMap: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]: 'warning',
      [TransactionStatus.PROCESSING]: 'tertiary',
      [TransactionStatus.COMPLETED]: 'success',
      [TransactionStatus.FAILED]: 'danger',
      [TransactionStatus.CANCELLED]: 'medium'
    };
    return colorMap[this.transaction?.status] || 'medium';
  }

  getStatusLabel(): string {
    const labelMap: Record<TransactionStatus, string> = {
      [TransactionStatus.PENDING]: 'Pendiente',
      [TransactionStatus.PROCESSING]: 'Procesando',
      [TransactionStatus.COMPLETED]: 'Completada',
      [TransactionStatus.FAILED]: 'Fallida',
      [TransactionStatus.CANCELLED]: 'Cancelada'
    };
    return labelMap[this.transaction?.status] || 'Desconocido';
  }

  getStatusClass(): string {
    return `status-${this.transaction?.status?.toLowerCase() || 'unknown'}`;
  }

  getAmountClass(): string {
    const impact = this.transaction?.calculateBalanceImpact?.();
    return impact !== undefined ? (impact >= 0 ? 'positive' : 'negative') : 'positive';
  }

  getAmountSign(): string {
    const impact = this.transaction?.calculateBalanceImpact?.();
    return impact !== undefined ? (impact >= 0 ? '+' : '-') : '+';
  }

  formatAmount(amount: number): string {
    if (amount === undefined || amount === null) {
      return '0.00';
    }
    return Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) {
      return '';
    }
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return '';
    }
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  truncateId(id: string): string {
    if (!id || id.length < 8) {
      return id || '';
    }
    return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
  }

  onRetry(event: Event): void {
    event.stopPropagation();
    this.retry.emit(this.transaction);
  }

  onDetails(event: Event): void {
    event.stopPropagation();
    this.details.emit(this.transaction);
  }