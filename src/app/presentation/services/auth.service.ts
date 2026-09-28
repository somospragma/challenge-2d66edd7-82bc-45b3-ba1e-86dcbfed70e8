import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, map, tap, switchMap, retry, shareReplay } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

const JWT_TOKEN_KEY = 'auth_jwt_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_DATA_KEY = 'auth_user_data';
const TOKEN_EXPIRY_BUFFER = 30000;

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  accountId: string;
  roles: string[];
}

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  accountId: string;
  roles: string[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(Storage);

  private readonly apiUrl = 'https://api.bankapp.example.com/v1';
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

  readonly isAuthenticated = signal<boolean>(false);
  readonly currentUser = signal<AuthUser | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly authError = signal<string | null>(null);

  readonly isAdmin = computed(() => {
    const user = this.currentUser();
    return user?.roles?.includes('admin') ?? false;
  });

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      await this.storage.create();
      const [token, refreshToken, userData] = await Promise.all([
        this.storage.get(JWT_TOKEN_KEY),
        this.storage.get(REFRESH_TOKEN_KEY),
        this.storage.get(USER_DATA_KEY)
      ]);

      if (token && this.isTokenValid(token)) {
        this.tokenSubject.next(token);
        this.refreshTokenSubject.next(refreshToken);
        if (userData) {
          this.currentUser.set(JSON.parse(userData));
        }
        this.isAuthenticated.set(true);
        this.scheduleTokenRefresh(token);
      } else {
        await this.clearAuthData();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      await this.clearAuthData();
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.authError.set(null);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error)),
      shareReplay(1)
    );
  }

  register(userData: { email: string; password: string; name: string }): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.authError.set(null);

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => this.handleAuthError(error)),
      shareReplay(1)
    );
  }

  logout(): void {
    this.clearAuthData();
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.tokenSubject.next(null);
    this.refreshTokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.refreshTokenSubject.value;
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      tap(response => this.handleAuthSuccess(response)),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        return true;
      }
      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();
      return expirationDate <= now;
    } catch {
      return true;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        return false;
      }
      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();
      const bufferTime = new Date(now.getTime() + TOKEN_EXPIRY_BUFFER);
      return expirationDate > bufferTime;
    } catch {
      return false;
    }
  }

  private decodeToken(token: string): TokenPayload | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.tokenSubject.next(response.accessToken);
    this.refreshTokenSubject.next(response.refreshToken);
    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
    this.isLoading.set(false);
    this.authError.set(null);

    this.storage.set(JWT_TOKEN_KEY, response.accessToken);
    this.storage.set(REFRESH_TOKEN_KEY, response.refreshToken);
    this.storage.set(USER_DATA_KEY, JSON.stringify(response.user));

    this.scheduleTokenRefresh(response.accessToken);
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    this.isLoading.set(false);
    let errorMessage = 'An error occurred during authentication';

    if (error.status === 401) {
      errorMessage = 'Invalid email or password';
    } else if (error.status === 403) {
      errorMessage = 'Account is locked or disabled';
    } else if (error.status === 0) {
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    this.authError.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private scheduleTokenRefresh(token: string): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) return;

      const expirationDate = new Date(payload.exp * 1000);
      const now = new Date();
      const timeUntilExpiry = expirationDate.getTime() - now.getTime();
      const refreshTime = timeUntilExpiry - TOKEN_EXPIRY_BUFFER;

      if (refreshTime > 0) {
        this.tokenExpirationTimer = setTimeout(() => {
          this.refreshToken().subscribe();
        }, refreshTime);
      } else {
        this.refreshToken().subscribe();
      }
    } catch (error) {
      console.error('Error scheduling token refresh:', error);
    }
  }

  private async clearAuthData(): Promise<void> {
    await Promise.all([
      this.storage.remove(JWT_TOKEN_KEY),
      this.storage.remove(REFRESH_TOKEN_KEY),
      this.storage.remove(USER_DATA_KEY)
    ]);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  updateUserProfile(updates: Partial<AuthUser>): Observable<AuthUser> {
    return this.http.patch<AuthUser>(`${this.apiUrl}/users/profile`, updates, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(user => {
        this.currentUser.set(user);
        this.storage.set(USER_DATA_KEY, JSON.stringify(user));
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/change-password`,
      { currentPassword, newPassword },
      { headers: this.getAuthHeaders() }
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/reset-password-request`, { email });
  }

  verifyEmail(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/verify-email`, { token }).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  resendVerificationEmail(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/auth/resend-verification`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}