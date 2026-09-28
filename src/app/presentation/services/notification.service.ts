import { Injectable, inject, signal } from '@angular/core';
import { ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { Subject, BehaviorSubject } from 'rxjs';

interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  TRANSACTION = 'transaction',
  SECURITY = 'security',
  SYSTEM = 'system'
}

interface ToastOptions {
  message: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  color?: string;
  icon?: string;
  cssClass?: string | string[];
  buttons?: Array<{ text: string; role?: string; handler?: () => void }>;
}

interface AlertOptions {
  header?: string;
  subHeader?: string;
  message: string;
  buttons?: Array<{ text: string; role?: string; handler?: () => void }>;
  inputs?: Array<{
    type: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'radio';
    name: string;
    placeholder?: string;
    value?: string | number | boolean;
    label?: string;
    checked?: boolean;
  }>;
  backdropDismiss?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly toastController = inject(ToastController);
  private readonly alertController = inject(AlertController);
  private readonly loadingController = inject(LoadingController);
  private readonly modalController = inject(ModalController);
  private readonly translate = inject(TranslateService);

  private readonly notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  private readonly unreadCountSubject = new BehaviorSubject<number>(0);
  private readonly loadingOverlay: { present: () => Promise<void>; dismiss: () => Promise<void> } | null = null;

  readonly notifications$ = this.notificationsSubject.asObservable();
  readonly unreadCount$ = this.unreadCountSubject.asObservable();
  readonly hasUnreadNotifications = signal<boolean>(false);

  private notificationIdCounter = 0;

  async showSuccessToast(message: string, duration = 3000): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'success',
      icon: 'checkmark-circle'
    });
  }

  async showErrorToast(message: string, duration = 4000): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'danger',
      icon: 'alert-circle'
    });
  }

  async showWarningToast(message: string, duration = 3500): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'warning',
      icon: 'warning'
    });
  }

  async showInfoToast(message: string, duration = 3000): Promise<void> {
    await this.showToast({
      message,
      duration,
      position: 'top',
      color: 'medium',
      icon: 'information-circle'
    });
  }

  async showToast(options: ToastOptions): Promise<void> {
    const translatedMessage = this.translate.instant(options.message);
    
    const toast = await this.toastController.create({
      message: translatedMessage,
      duration: options.duration ?? 3000,
      position: options.position ?? 'top',
      color: options.color ?? 'medium',
      cssClass: options.cssClass,
      buttons: options.buttons,
      animated: true,
      translucent: false
    });

    await toast.present();
  }

  async showAlert(options: AlertOptions): Promise<boolean> {
    const translatedHeader = options.header ? this.translate.instant(options.header) : undefined;
    const translatedSubHeader = options.subHeader ? this.translate.instant(options.subHeader) : undefined;
    const translatedMessage = this.translate.instant(options.message);

    const alert = await this.alertController.create({
      header: translatedHeader,
      subHeader: translatedSubHeader,
      message: translatedMessage,
      buttons: options.buttons ?? [
        {
          text: this.translate.instant('common.ok'),
          role: 'confirm'
        }
      ],
      inputs: options.inputs,
      backdropDismiss: options.backbackDismiss ?? true,
      animated: true
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    return result.role === 'confirm';
  }

  async showConfirmAlert(
    message: string,
    confirmText?: string,
    cancelText?: string,
    header?: string
  ): Promise<boolean> {
    return this.showAlert({
      header: header ?? this.translate.instant('common.confirm'),
      message,
      buttons: [
        {
          text: cancelText ?? this.translate.instant('common.cancel'),
          role: 'cancel'
        },
        {
          text: confirmText ?? this.translate.instant('common.confirm'),
          role: 'confirm'
        }
      ]
    });
  }

  async showLoading(message: string = 'Loading...'): Promise<void> {
    const translatedMessage = this.translate.instant(message);
    const loading = await this.loadingController.create({
      message: translatedMessage,
      spinner: 'circular',
      cssClass: 'loading-overlay',
      backdropDismiss: false,
      animated: true
    });
    await loading.present();
  }

  async hideLoading(): Promise<void> {
    try {
      await this.loadingController.dismiss();
    } catch {
      // Loading was not present
    }
  }

  async showTransactionNotification(
    type: 'success' | 'failed' | 'pending',
    amount: number,
    recipientName: string
  ): Promise<void> {
    let title: string;
    let message: string;
    let color: string;
    let icon: string;

    switch (type) {
      case 'success':
        title = this.translate.instant('notifications.transactionSuccess');
        message = this.translate.instant('notifications.sentTo', { name: recipientName, amount });
        color = 'success';
        icon = 'checkmark-circle';
        break;
      case 'failed':
        title = this.translate.instant('notifications.transactionFailed');
        message = this.translate.instant('notifications.failedTo', { name: recipientName });
        color = 'danger';
        icon = 'alert-circle';
        break;
      case 'pending':
        title = this.translate.instant('notifications.transactionPending');
        message = this.translate.instant('notifications.pendingTo', { name: recipientName });
        color = 'warning';
        icon = 'time';
        break;
    }

    await this.showToast({
      message: `${title}: ${message}`,
      duration: 4000,
      position: 'top',
      color,
      icon
    });
  }

  async showSecurityAlert(message: string): Promise<void> {
    await this.showAlert({
      header: this.translate.instant('notifications.securityAlert'),
      message,
      buttons: [
        {
          text: this.translate.instant('common.acknowledge'),
          role: 'confirm'
        }
      ]
    });
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: AppNotification = {
      ...notification,
      id: `notif_${++this.notificationIdCounter}_${Date.now()}`,
      timestamp: new Date(),
      read: false
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([newNotification, ...currentNotifications]);
    this.updateUnreadCount();
  }

  markAsRead(notificationId: string): void {
    const notifications = this.notificationsSubject.value.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(notif => ({
      ...notif,
      read: true
    }));
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
    this.updateUnreadCount();
  }

  getNotificationById(id: string): AppNotification | undefined {
    return this.notificationsSubject.value.find(n => n.id === id);
  }

  private updateUnreadCount(): void {
    const unreadCount = this.notificationsSubject.value.filter(n => !n.read).length;
    this.unreadCountSubject.next(unreadCount);
    this.hasUnreadNotifications.set(unreadCount > 0);
  }

  async showBalanceUpdateNotification(newBalance: number, previousBalance: number): Promise<void> {
    const difference = newBalance - previousBalance;
    const direction = difference >= 0 ? 'increase' : 'decrease';
    const formattedDifference = Math.abs(difference).toFixed(2);

    const title = direction === 'increase'
      ? this.translate.instant('notifications.balanceIncreased')
      : this.translate.instant('notifications.balanceDecreased');
    
    const message = this.translate.instant('notifications.balanceChange', {
      direction: this.translate.instant(`common.${direction}`),
      amount: formattedDifference
    });

    await this.showToast({
      message: `${title}: ${message}`,
      duration: 4000,
      position: 'top',
      color: direction === 'increase' ? 'success' : 'warning',
      icon: direction === 'increase' ? 'arrow-up-circle' : 'arrow-down-circle'
    });
  }

  async showAccountLockedNotification(): Promise<void> {
    await this.showAlert({
      header: this.translate.instant('notifications.accountLocked'),
      message: this.translate.instant('notifications.accountLockedMessage'),
      buttons: [
        {
          text: this.translate.instant('common.contactSupport'),
          role: 'confirm'
        }
      ]
    });
  }

  async showSessionExpiredNotification(): Promise<void> {
    const confirmed = await this.showConfirmAlert(
      this.translate.instant('notifications.sessionExpired'),
      this.translate.instant('common.login'),
      this.translate.instant('common.cancel')
    );

    if (confirmed) {
      // Navigation to login will be handled by the component
    }
  }
}