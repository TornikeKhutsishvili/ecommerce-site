import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface User {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal(false);
  currentUser = signal<User | null>(null);

  private translate =inject(TranslateService);

  constructor() {
    this.loadFromStorage();
  }

  login(email: string, password: string): boolean {
    // DEMO: here should be really API call
    const user: User = {
      name: email.split('@')[0],
      email,
      role: email === 'admin@example.com' ? 'admin' : 'user'
    };

    this.isLoggedIn.set(true);
    this.currentUser.set(user);

    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('auth_logged_in', 'true');

    return true;
  }

  register(name: string, email: string, password: string) {
    // DEMO: API call register
    alert(`Account created for ${name}`);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_logged_in');
  }

  loadFromStorage() {
    const loggedIn = localStorage.getItem('auth_logged_in') === 'true';
    const storedUser = localStorage.getItem('auth_user');

    if (loggedIn && storedUser) {
      this.isLoggedIn.set(true);
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

}
