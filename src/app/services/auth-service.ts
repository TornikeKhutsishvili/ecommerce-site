import {
  Inject,
  Injectable,
  PLATFORM_ID,
  signal
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  Observable,
  of,
  tap
} from 'rxjs';

import { User } from '../interfaces/auth-user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;


  // Signals
  isLoggedIn = signal(false);
  currentUser = signal<User | null>(null);

  private readonly STORAGE_KEY = 'auth_user';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadFromStorage();
  }


  getAccessToken(): string | null {
    return this.accessToken;
  }


  refreshToken(): Observable<any> {
    // აქ უნდა გავიდე სერვერზე refresh token-ით და ახალი access token ავიღო
    // მაგალითად: this.http.post('/api/refresh', { token: this.refreshTokenValue })

    // mock მაგალითი:
    return of(true).pipe(
      tap(() => {
        this.accessToken = 'new_access_token';
      })
    );
  }


  // Login
  login(email: string, password: string): boolean {
    const storedUser = this.getUserByEmail(email);
    if (!storedUser) return false;

    if (storedUser.password === password) {
      this.safeSetItem(this.STORAGE_KEY, JSON.stringify(storedUser));
      this.isLoggedIn.set(true);
      this.currentUser.set(storedUser);
      return true;
    }
    return false;
  }


  // Register
  register(name: string, email: string, password: string): boolean {
    if (this.getUserByEmail(email)) return false;

    const newUser: User = {
      name,
      email,
      password,
      role: email === 'admin@example.com' ? 'admin' : 'user'
    };

    this.safeSetItem(email, JSON.stringify(newUser));
    return true;
  }


  // Logout
  logout(): void {
    this.safeRemoveItem(this.STORAGE_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);

    this.accessToken = null;
    this.refreshTokenValue = null;
  }


  // Check if logged in
  checkLogin(): boolean {
    return this.isLoggedIn();
  }


  // Get current user
  getUser(): User | null {
    return this.currentUser();
  }


  // Search by email
  getUserByEmail(email: string): User | null {
    const data = this.safeGetItem(email);
    return data ? JSON.parse(data) : null;
  }


  // Load from storage
  public loadFromStorage() {
    const storedUserStr = this.safeGetItem(this.STORAGE_KEY);
    if (storedUserStr) {
      const user: User = JSON.parse(storedUserStr);
      this.isLoggedIn.set(true);
      this.currentUser.set(user);
    }
  }


  // Is admin?
  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }


  // Safe storage access
  private safeGetItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try { return localStorage.getItem(key); }
      catch { return null; }
    }
    return null;
  }


  private safeSetItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.setItem(key, value); }
      catch {}
    }
  }


  private safeRemoveItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(key); }
      catch {}
    }
  }

}