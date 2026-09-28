import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLoading, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, IonSelect, IonSelectOption, IonSearchbar, IonButtons, IonButton, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Subject, takeUntil, catchError, finalize } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { TransactionStore } from '../../store/transaction.store';
import { Transaction, TransactionStatus, TransactionType } from '../../../domain/entities/transaction.entity';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLoading,
    IonRefresher,
    IonRefresherContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    TransactionCardComponent
  ],
  templateUrl: './transactions.page.html'
})
export class TransactionsPage implements OnInit, OnDestroy {
  private readonly transactionService = inject(TransactionService);
  private readonly transactionStore = inject(TransactionStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly transactions = this.transactionStore.transactions;
  readonly isLoading = this.transactionStore.isLoading;
  readonly error = this.transactionStore.error;
  readonly syncStatus = this.transactionStore.syncStatus;

  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<TransactionStatus | 'ALL'>('ALL');
  readonly typeFilter = signal<TransactionType | 'ALL'>('ALL');

  readonly filteredTransactions = computed(() => {
    let result = this.transactions();
    const query = this.searchQuery().toLowerCase();
    const status = this.statusFilter();
    const type = this.typeFilter();

    if (query) {
      result = result.filter(t => 
        t.description?.toLowerCase().includes(query) ||
        t.id.toLowerCase().includes(query)
      );
    }

    if (status !== 'ALL') {
      result = result.filter(t => t.status === status);
    }

    if (type !== 'ALL') {
      result = result.filter(t => t.type === type);
    }

    return result;
  });

  readonly pendingCount = computed(() => 
    this.transactions().filter(t => t.status === TransactionStatus.PENDING).length
  );

  readonly completedCount = computed(() => 
    this.transactions().filter(t => t.status === TransactionStatus.COMPLETED).length
  );

  readonly failedCount = computed(() => 
    this.transactions().filter(t => t.status === TransactionStatus.FAILED).length
  );

  readonly totalAmount = computed(() => 
    this.transactions().reduce((sum, t) => sum + Math.abs(t.amount), 0)
  );

  private pageSize = 20;
  private currentPage = 0;
  private hasMoreData = true;

  ngOnInit(): void {
    this.loadTransactions();
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTransactions(): void {
    this.transactionStore.setLoading(true);
    this.transactionStore.clearError();

    this.transactionService.getTransactions(this.pageSize, 0)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al cargar transacciones: ' + err.message);
          return [];
        }),
        finalize(() => this.transactionStore.setLoading(false))
      )
      .subscribe(transactions => {
        this.transactionStore.setTransactions(transactions);
        this.currentPage = 1;
        this.hasMoreData = transactions.length >= this.pageSize;
      });
  }

  loadMoreTransactions(event: any): void {
    if (!this.hasMoreData) {
      event.target.complete();
      return;
    }

    this.transactionService.getTransactions(this.pageSize, this.currentPage * this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al cargar más transacciones');
          return [];
        })
      )
      .subscribe(transactions => {
        const currentTransactions = this.transactions();
        this.transactionStore.setTransactions([...currentTransactions, ...transactions]);
        this.currentPage++;
        this.hasMoreData = transactions.length >= this.pageSize;
        event.target.complete();
      });
  }

  handleRefresh(event: any): void {
    this.transactionStore.clearTransactions();
    this.currentPage = 0;
    this.hasMoreData = true;

    this.transactionService.getTransactions(this.pageSize, 0)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al sincronizar');
          return [];
        })
      )
      .subscribe(transactions => {
        this.transactionStore.setTransactions(transactions);
        this.currentPage = 1;
        event.target.complete();
      });
  }

  onSearch(event: any): void {
    this.searchQuery.set(event.detail.value || '');
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter.set(event.detail.value);
  }

  onTypeFilterChange(event: any): void {
    this.typeFilter.set(event.detail.value);
  }

  onTransactionClick(transaction: Transaction): void {
    this.router.navigate(['/transactions', transaction.id]);
  }

  retryFailedTransaction(transaction: Transaction): void {
    if (transaction.status !== TransactionStatus.FAILED) {
      return;
    }

    this.transactionStore.setLoading(true);
    this.transactionService.retryTransaction(transaction.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al reintentar transacción');
          return [];
        }),
        finalize(() => this.transactionStore.setLoading(false))
      )
      .subscribe(updatedTransaction => {
        if (updatedTransaction) {
          const current = this.transactions();
          const updated = current.map(t => 
            t.id === updatedTransaction.id ? updatedTransaction : t
          );
          this.transactionStore.setTransactions(updated);
        }
      });
  }

  syncWithBackend(): void {
    this.transactionStore.setLoading(true);
    this.transactionService.syncWithBackend()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.transactionStore.setError('Error al sincronizar con el servidor');
          return [];
        }),
        finalize(() => this.transactionStore.setLoading(false))
      )
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.statusFilter.set('ALL');
    this.typeFilter.set('ALL');
  }

  private setupAutoRefresh(): void {
    setInterval(() => {
      if (!this.isLoading()) {
        this.syncWithBackend();
      }
    }, 30000);
  }
}