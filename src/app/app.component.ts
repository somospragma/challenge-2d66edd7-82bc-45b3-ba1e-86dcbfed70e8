import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { IonicModule, Platform, MenuController } from '@ionic/angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { AuthService } from './presentation/services/auth.service';
import { NotificationService } from './presentation/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <ion-app [class.dark-theme]="isDarkMode">
      <ion-menu *ngIf="isAuthenticated" contentId="main-content" type="overlay">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Menú Principal</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button (click)="navigateTo('/home')">
              <ion-icon slot="start" name="home"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>
            <ion-item button (click)="navigateTo('/transactions')">
              <ion-icon slot="start" name="swap-horizontal"></ion-icon>
              <ion-label>Transacciones</ion-label>
            </ion-item>
            <ion-item button (click)="navigateTo('/accounts')">
              <ion-icon slot="start" name="wallet"></ion-icon>
              <ion-label>Cuentas</ion-label>
            </ion-item>
            <ion-item button (click)="navigateTo('/settings')">
              <ion-icon slot="start" name="settings"></ion-icon>
              <ion-label>Configuración</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
        <ion-footer>
          <ion-button expand="full" (click)="logout()" color="danger">
            <ion-icon slot="start" name="log-out"></ion-icon>
            Cerrar Sesión
          </ion-button>
        </ion-footer>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>

      <ion-alert
        [isOpen]="showAlert"
        [header]="alertHeader"
        [message]="alertMessage"
        [buttons]="alertButtons"
        (didDismiss)="onAlertDismiss()">
      </ion-alert>

      <ion-toast
        [isOpen]="showToast"
        [message]="toastMessage"
        [duration]="toastDuration"
        [color]="toastColor"
        (didDismiss)="onToastDismiss()">
      </ion-toast>
    </ion-app>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    ion-app {
      height: 100%;
    }
    .dark-theme {
      --background: #1a1a1a;
      --text-color: #ffffff;
    }
    ion-menu {
      --background: var(--ion-background-color, #ffffff);
    }
    ion-item {
      --padding-start: 16px;
      --inner-padding-end: 16px;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly platform = inject(Platform);
  private readonly router = inject(Router);
  private readonly menuController = inject(MenuController);
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly destroy$ = new Subject<void>();

  isAuthenticated = false;
  isDarkMode = false;
  showAlert = false;
  alertHeader = '';
  alertMessage = '';
  alertButtons: string[] = [];
  showToast = false;
  toastMessage = '';
  toastDuration = 3000;
  toastColor: 'success' | 'warning' | 'danger' | 'primary' = 'primary';

  ngOnInit(): void {
    this.initializeApp();
    this.setupNavigationTracking();
    this.setupAuthObserver();
    this.setupNotifications();
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      this.checkAuthStatus();
      this.registerBackButtonHandler();
      this.applyThemePreferences();
    });
  }

  private checkAuthStatus(): void {
    this.authService.isAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe(auth => {
        this.isAuthenticated = auth;
        if (!auth) {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
      });
  }

  private setupNavigationTracking(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.onNavigationChange(event.urlAfterRedirects);
    });
  }

  private setupAuthObserver(): void {
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.isAuthenticated = state.isAuthenticated;
        if (!state.isAuthenticated && this.isAuthenticated) {
          this.handleSessionExpired();
        }
      });
  }

  private setupNotifications(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notification => {
        if (notification) {
          this.displayNotification(notification);
        }
      });
  }

  private registerBackButtonHandler(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  private handleBackButton(): void {
    const url = this.router.url;
    if (url === '/home' || url === '/login') {
      this.showExitConfirmation();
    } else {
      this.router.navigate(['/home']);
    }
  }

  private showExitConfirmation(): void {
    this.alertHeader = 'Salir';
    this.alertMessage = '¿Desea salir de la aplicación?';
    this.alertButtons = ['Cancelar', 'Salir'];
    this.showAlert = true;
  }

  private applyThemePreferences(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    prefersDark.addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
    });
  }

  private onNavigationChange(url: string): void {
    if (this.isAuthenticated && url !== '/login') {
      this.menuController.enable(true);
    } else {
      this.menuController.enable(false);
    }
  }

  private handleSessionExpired(): void {
    this.alertHeader = 'Sesión Expirada';
    this.alertMessage = 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.';
    this.alertButtons = ['Aceptar'];
    this.showAlert = true;
  }

  private displayNotification(notification: { title: string; message: string; type: string }): void {
    this.toastMessage = notification.message;
    this.toastColor = notification.type as any;
    this.toastDuration = 3000;
    this.showToast = true;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.menuController.close();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.menuController.close();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  onAlertDismiss(): void {
    this.showAlert = false;
  }

  onToastDismiss(): void {
    this.showToast = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}