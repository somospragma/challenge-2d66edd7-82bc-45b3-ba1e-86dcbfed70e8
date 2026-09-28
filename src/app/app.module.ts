import { NgModule, APP_INITIALIZER, ErrorHandler, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule, IonicErrorHandler, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './presentation/pages/home/home.page';
import { TransactionsPage } from './presentation/pages/transactions/transactions.page';
import { TransactionCardComponent } from './presentation/components/transaction-card/transaction-card.component';
import { BalanceDisplayComponent } from './presentation/components/balance-display/balance-display.component';

import { TransactionService } from './presentation/services/transaction.service';
import { AuthService } from './presentation/services/auth.service';
import { NotificationService } from './presentation/services/notification.service';
import { TransactionStore } from './presentation/store/transaction.store';

import { TransactionRepository } from './domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from './data/repositories/transaction.repository.impl';
import { AccountRepository } from './domain/repositories/account.repository';
import { AccountRepositoryImpl } from './data/repositories/account.repository.impl';

import { ProcessTransactionUseCase } from './domain/usecases/process-transaction.usecase';
import { GetAccountBalanceUseCase } from './domain/usecases/get-account-balance.usecase';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'transactions', component: TransactionsPage },
  { path: 'login', loadChildren: () => import('./presentation/pages/login/login.module').then(m => m.LoginModule) },
  { path: 'accounts', loadChildren: () => import('./presentation/pages/accounts/accounts.module').then(m => m.AccountsModule) },
  { path: 'settings', loadChildren: () => import('./presentation/pages/settings/settings.module').then(m => m.SettingsModule) },
  { path: '**', redirectTo: 'home' }
];

export function initializeApp(httpClient: HttpClient, authService: AuthService): () => Promise<any> {
  return () => authService.initializeFromStorage().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    TransactionsPage,
    TransactionCardComponent,
    BalanceDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot({
      mode: 'ios',
      backButtonText: 'Atrás',
      spinnerName: 'lines',
      swipeBackEnabled: true
    }),
    RouterModule.forRoot(routes, { preloadingStrategy: IonicRouteStrategy })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: require('./presentation/interceptors/auth.interceptor').AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: require('./presentation/interceptors/error.interceptor').ErrorInterceptor,
      multi: true
    },
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl
    },
    TransactionService,
    AuthService,
    NotificationService,
    TransactionStore,
    ProcessTransactionUseCase,
    GetAccountBalanceUseCase,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [HttpClient, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.configureGlobalErrorHandling();
  }

  private configureGlobalErrorHandling(): void {
    if (!isDevMode()) {
      window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
      });

      window.addEventListener('error', (event) => {
        console.error('Global Error:', event.error);
      });
    }
  }
}