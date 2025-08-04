import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  userEmail = signal<string | null>(null);

  login(email: string) {
    this.isLoggedIn.set(true);
    this.userEmail.set(email);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.userEmail.set(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  }

  loadFromStorage() {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    this.isLoggedIn.set(loggedIn);
    if (email) this.userEmail.set(email);
  }

}
