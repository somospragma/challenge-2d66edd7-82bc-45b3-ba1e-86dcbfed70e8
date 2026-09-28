import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, loadingController, alertController } from '@ionic/angular';
import { Subject, takeUntil, forkJoin } from 'rxjs';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { Account } from '../../../domain/entities/account.entity';

@Component({
  selector: 'app-balance-display',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-card class="balance-card">
      <ion-card-header>
        <ion-card-title class="balance-title">Saldo Disponible</ion-card-title>
        <ion-card-subtitle class="account-info">
          @if (accountId()) {
            <span>Cuenta: {{ accountId() | slice:0:4 }}****</span>
          }
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        @if (isLoading()) {
          <div class="skeleton-container">
            <ion-skeleton-text animated class="balance-skeleton"></ion-skeleton-text>
            <ion-skeleton-text animated class="sub-skeleton"></ion-skeleton-text>
          </div>
        } @else if (error()) {
          <div class="error-container">
            <ion-icon name="alert-circle-outline" class="error-icon"></ion-icon>
            <p class="error-message">{{ error() }}</p>
            <ion-button fill="outline" size="small" (click)="retryLoad()">
              Reintentar
            </ion-button>
          </div>
        } @else {
          <div class="balance-amount" [class.positive]="balance() > 0" [class.negative]="balance() < 0">
            <span class="currency">$</span>
            <span class="amount">{{ formatBalance(balance()) }}</span>
          </div>
          <div class="balance-details">
            <div class="detail-row">
              <span class="label">Última actualización:</span>
              <span class="value">{{ lastUpdate() | date:'short' }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Transacciones pendientes:</span>
              <span class="value pending-count">{{ pendingCount() }}</span>
            </div>
          </div>
          <div class="balance-actions">
            <ion-button expand="block" fill="outline" (click)="refreshBalance()">
              <ion-icon slot="start" name="refresh-outline"></ion-icon>
              Actualizar
            </ion-button>
          </div>
        }
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .balance-card {
      margin: 16px;
      border-radius: 16px;
      --background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
      --color: #ffffff;
    }
    .balance-title {
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.85;
    }
    .account-info {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 4px;
    }
    .balance-amount {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin: 24px 0;
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .balance-amount.positive {
      color: #4ade80;
    }
    .balance-amount.negative {
      color: #f87171;
    }
    .currency {
      font-size: 24px;
      font-weight: 500;
      margin-right: 4px;
    }
    .amount {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1px;
    }
    .balance-details {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
    }
    .detail-row:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .label {
      font-size: 12px;
      opacity: 0.7;
    }
    .value {
      font-size: 13px;
      font-weight: 500;
    }
    .pending-count {
      color: #fbbf24;
      font-weight: 600;
    }
    .balance-actions ion-button {
      --border-color: rgba(255, 255, 255, 0.3);
      --color: #ffffff;
    }
    .skeleton-container {
      padding: 20px 0;
    }
    .balance-skeleton {
      height: 48px;
      width: 70%;
      margin: 0 auto 12px;
    }
    .sub-skeleton {
      height: 16px;
      width: 50%;
      margin: 0 auto;
    }
    .error-container {
      text-align: center;
      padding: 20px;
    }
    .error-icon {
      font-size: 48px;
      color: #f87171;
      margin-bottom: 12px;
    }
    .error-message {
      color: #fca5a5;
      font-size: 14px;
      margin-bottom: 16px;
    }
  `]
})
export class BalanceDisplayComponent implements OnInit, OnDestroy {
  private readonly transactionRepository = inject(TransactionRepository);
  private readonly destroy$ = new Subject<void>();

  readonly balance = signal<number>(0);
  readonly accountId = signal<string>('');
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly lastUpdate = signal<Date>(new Date());
  readonly pendingCount = signal<number>(0);

  readonly formattedBalance = computed(() => this.formatBalance(this.balance()));

  async ngOnInit(): Promise<void> {
    await this.loadAccountData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadAccountData(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const mockAccountId = 'ACC-2024-001';
      this.accountId.set(mockAccountId);

      const transactions = await this.transactionRepository
        .findByAccountId(mockAccountId, 100, 0)
        .pipe(takeUntil(this.destroy$))
        .toPromise();

      if (!transactions || transactions.length === 0) {
        this.balance.set(0);
        this.pendingCount.set(0);
        this.isLoading.set(false);
        return;
      }

      const calculatedBalance = this.calculateBalanceFromTransactions(transactions);
      const pendingTransactions = transactions.filter(t => 
        t.isProcessable && t.withStatus('PENDING')
      );

      this.balance.set(calculatedBalance);
      this.pendingCount.set(pendingTransactions.length);
      this.lastUpdate.set(new Date());

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar el saldo';
      this.error.set(message);
      console.error('[BalanceDisplay] Error loading account data:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  private calculateBalanceFromTransactions(transactions: Transaction[]): number {
    return transactions.reduce((total, transaction) => {
      const impact = transaction.calculateBalanceImpact();
      return total + impact;
    }, 0);
  }

  formatBalance(amount: number): string {
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return amount < 0 ? `-${formatted}` : formatted;
  }

  async refreshBalance(): Promise<void> {
    const loading = await loadingController.create({
      message: 'Actualizando saldo...',
      duration: 1500,
      spinner: 'circles'
    });

    await loading.present();
    await this.loadAccountData();
    await loading.dismiss();
  }

  async retryLoad(): Promise<void> {
    await this.loadAccountData();
  }

  updateAccountId(newAccountId: string): void {
    this.accountId.set(newAccountId);
    this.loadAccountData();
  }