import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  inject
} from '@angular/core';

import {
  Observable,
  of,
  tap
} from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { EmailService } from './email-service';

export interface User {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  active: boolean;
  bio?: string;
  photoUrl?: string;
  telephone?: number;
  city?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private emailService = inject(EmailService);
  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;
  users = this.loadFromStorage();

  // Signals
  isLoggedIn = signal(false);
  currentUser = signal<User | null>(null);

  private readonly STORAGE_KEY = 'auth_user';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadFromStorage();
  }


  getAllUsers(): any[] {
    const users: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const parsed = JSON.parse(data);
          if (parsed?.email) {
            users.push(parsed);
          }
        }
      } catch {}
    }
    return users;
  }


  getAccessToken(): string | null {
    return this.accessToken;
  }


  refreshToken(): Observable<any> {
    return of(true).pipe(
      tap(() => { this.accessToken = 'new_access_token'; })
    );
  }


  login(email: string, password: string): boolean {
    const storedUser = this.getUserByEmail(email);
    if (!storedUser) return false;

    if (storedUser.password === password) {
      this.safeSetItem(this.STORAGE_KEY, JSON.stringify(storedUser));
      this.isLoggedIn.set(true);
      this.currentUser.set(storedUser);
      this.accessToken = 'mock_access_token';
      this.refreshTokenValue = 'mock_refresh_token';
      return true;
    }
    return false;
  }


  register(name: string, email: string, password: string, active: boolean): boolean {
    if (this.getUserByEmail(email)) return false;

    const newUser: User = {
      name,
      email,
      password,
      active,
      role: email === 'admin@example.com' ? 'admin' : 'user'
    };

    this.safeSetItem(email, JSON.stringify(newUser));
    return true;
  }


  logout(): void {
    this.safeRemoveItem(this.STORAGE_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.accessToken = null;
    this.refreshTokenValue = null;
  }


  getUser(): User | null {
    return this.currentUser();
  }


  getUserByEmail(email: string): User | null {
    const data = this.safeGetItem(email);
    return data ? JSON.parse(data) : null;
  }


  private loadFromStorage(): void {
    const storedUserStr = this.safeGetItem(this.STORAGE_KEY);
    if (storedUserStr) {
      const user: User = JSON.parse(storedUserStr);
      this.isLoggedIn.set(true);
      this.currentUser.set(user);
    }
  }


  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }


  private safeGetItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try { return localStorage.getItem(key); } catch { return null; }
    }
    return null;
  }


  private safeSetItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.setItem(key, value); } catch {}
    }
  }


  private safeRemoveItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try { localStorage.removeItem(key); } catch {}
    }
  }


  // update user
  updateUser(updatedUser: User): boolean {
    if (!updatedUser?.email) return false;

    // Save updated user under main STORAGE_KEY
    this.safeSetItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
    this.currentUser.set(updatedUser);
    this.isLoggedIn.set(true);

    // also update user email on key
    this.safeSetItem(updatedUser.email, JSON.stringify(updatedUser));

    return true;
  }


  sendMessage(email: string) {
    const formData = {
      from_name: 'TKShop',
      user_email: this.getUserByEmail,
      message: "თქვენ შეიძინეთ პროდუქცია. გმადლობთ შეკვეთისთვის, ჩვენი კურიერი დაგიკავშირდებათ!"
    };

    return this.emailService.sendEmail(formData);
  }

}