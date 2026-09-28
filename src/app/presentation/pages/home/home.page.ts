import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonList, IonItem, IonLabel, IonBadge, IonRefresher, IonRefresherContent, IonSkeletonText, IonAlert } from '@ionic/angular/standalone';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { catchError, finalize, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { TransactionStore } from '../../store/transaction.store';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionType, TransactionStatus } from '../../../domain/entities/transaction.entity';
import { Account } from '../../../domain/entities/account.entity';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  color: string;
}

interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingTransactions: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly transactionStore = inject(TransactionStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly userName = computed(() => this.authService.currentUser()?.name ?? 'User');
  readonly userEmail = computed(() => this.authService.currentUser()?.email ?? '');
  readonly isLoading = this.transactionStore.isLoading;
  readonly error = this.transactionStore.error;
  readonly transactions = this.transactionStore.transactions;
  readonly recentTransactions = this.transactionStore.recentTransactions;

  readonly accountId = computed(() => this.authService.currentUser()?.accountId ?? '');

  readonly dashboardStats = computed<DashboardStats>(() => {
    const allTransactions = this.transactions();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthlyTransactions = allTransactions.filter(
      t => new Date(t.createdAt) >= startOfMonth
    );

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === TransactionType.CREDIT || t.type === TransactionType.DEPOSIT)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === TransactionType.DEBIT || t.type === TransactionType.WITHDRAWAL)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const pendingCount = allTransactions.filter(
      t => t.status === TransactionStatus.PENDING
    ).length;

    return {
      totalBalance: 12500.00,
      monthlyIncome,
      monthlyExpenses,
      pendingTransactions: pendingCount
    };
  });

  readonly quickActions: QuickAction[] = [
    {
      id: 'send',
      label: 'Send',
      icon: 'send',
      route: '/transfer',
      color: 'primary'
    },
    {
      id: 'receive',
      label: 'Receive',
      icon: 'arrow-down-circle',
      route: '/receive',
      color: 'success'
    },
    {
      id: 'pay',
      label: 'Pay',
      icon: 'wallet',
      route: '/payments',
      color: 'warning'
    },
    {
      id: 'topup',
      label: 'Top Up',
      icon: 'add-circle',
      route: '/topup',
      color: 'tertiary'
    }
  ];

  readonly unreadNotificationCount = signal<number>(0);
  readonly showErrorAlert = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadInitialData();
    this.subscribeToNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    const accountId = this.accountId();
    if (accountId) {
      this.transactionStore.loadTransactions(accountId);
    }
  }

  private subscribeToNotifications(): void {
    this.notificationService.unreadCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => this.unreadNotificationCount.set(count));
  }

  async handleRefresh(event: Event): Promise<void> {
    const accountId = this.accountId();
    if (!accountId) {
      return;
    }

    try {
      await this.transactionStore.syncTransactions();
    } catch (error) {
      this.errorMessage.set('Failed to refresh data. Please try again.');
      this.showErrorAlert.set(true);
    } finally {
      const refresher = event as CustomEvent;
      await refresher.target.complete();
    }
  }

  onQuickAction(action: QuickAction): void {
    this.router.navigate([action.route]);
  }

  onTransactionClick(transaction: Transaction): void {
    this.transactionStore.selectTransaction(transaction);
    this.router.navigate(['/transactions', transaction.id]);
  }

  onViewAllTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  async onLogout(): Promise<void> {
    const confirmed = await this.notificationService.showConfirmAlert(
      'Are you sure you want to log out?',
      'Logout',
      'Cancel'
    );

    if (confirmed) {
      this.authService.logout();
    }
  }

  onNotificationsClick(): void {
    this.router.navigate(['/notifications']);
  }

  onProfileClick(): void {
    this.router.navigate(['/profile']);
  }

  getTransactionIcon(type: TransactionType): string {
    switch (type) {
      case TransactionType.CREDIT:
        return 'arrow-down-circle';
      case TransactionType.DEBIT:
        return 'arrow-up-circle';
      case TransactionType.TRANSFER:
        return 'swap-horizontal';
      case TransactionType.PAYMENT:
        return 'card';
      case TransactionType.DEPOSIT:
        return 'cash';
      case TransactionType.WITHDRAWAL:
        return 'wallet';
      default:
        return 'ellipse';
    }
  }

  getTransactionColor(type: TransactionType): string {
    switch (type) {
      case TransactionType.CREDIT:
      case TransactionType.DEPOSIT:
        return 'success';
      case TransactionType.DEBIT:
      case TransactionType.WITHDRAWAL:
      case TransactionType.PAYMENT:
        return 'danger';
      case TransactionType.TRANSFER:
        return 'primary';
      default:
        return 'medium';
    }
  }

  getStatusColor(status: TransactionStatus): string {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return 'success';
      case TransactionStatus.PENDING:
        return 'warning';
      case TransactionStatus.FAILED:
        return 'danger';
      case TransactionStatus.CANCELLED:
        return 'medium';
      default:
        return 'medium';
    }
  }

  formatAmount(amount: number, type: TransactionType): string {
    const isCredit = type === TransactionType.CREDIT || 
                     type === TransactionType.DEPOSIT || 
                     type === TransactionType.REFUND;
    const prefix = isCredit ? '+' : '-';
    return `${prefix}$${Math.abs(amount).toFixed(2)}`;
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  dismissErrorAlert(): void {
    this.showErrorAlert.set(false);
    this.errorMessage.set('');
  }
}