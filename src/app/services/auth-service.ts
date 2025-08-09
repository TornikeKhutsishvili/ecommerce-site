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

  // variables
  isLoggedIn = signal(false);
  currentUser = signal<User | null>(null);



  constructor() {
    this.loadFromStorage();
  }



  // login
  login(email: string, password: string): boolean {

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



  // logout
  register(name: string, email: string, password: string) {
    alert(`Account created for ${name}`);
  }



  // logout
  logout() {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_logged_in');
  }



  // load from storage
  loadFromStorage() {
    const loggedIn = localStorage.getItem('auth_logged_in') === 'true';
    const storedUser = localStorage.getItem('auth_user');

    if (loggedIn && storedUser) {
      this.isLoggedIn.set(true);
      this.currentUser.set(JSON.parse(storedUser));
    }
  }




  // Admin
  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

}
