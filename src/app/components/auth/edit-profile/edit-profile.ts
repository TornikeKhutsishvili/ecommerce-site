import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth-service';
import { AlertToasts } from "../../toasts/alert-toasts/alert-toasts";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertToasts
],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.scss']
})
export class EditProfile implements OnInit {

  username = signal('');
  password = signal('');
  confirmPassword = signal('');
  email = signal('');
  success = signal(false);
  showPassword = signal(false);
  showOldPassword = signal(false);
  errorMessage = signal('');

  oldPasswordValue = signal('');
  usernameValue = signal('');
  passwordValue = signal('');
  confirmPasswordValue = signal('');

  show = signal('👁️');
  hide = signal('🙈');

  private auth = inject(AuthService);
  private router = inject(Router);

  @ViewChild('alertToast') alertToast!: AlertToasts;

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (user) {
      this.username.set(user.name ?? '');
      this.email.set(user.email ?? '');
      this.usernameValue.set(this.username());
      this.oldPasswordValue.set('');
      this.passwordValue.set('');
      this.confirmPasswordValue.set('');
    }
  }

  save(): void {
    this.errorMessage.set('');

    const storedUser = localStorage.getItem('auth_user');
    if (!storedUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    let user: any;
    try {
      user = JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('auth_user');
      this.router.navigate(['/auth/login']);
      return;
    }

    if (this.oldPasswordValue() !== user.password) {
      this.alertToast.openToast('Old Password is incorrect.');
      this.errorMessage.set('Old Password is incorrect.');
      return;
    }

    // Username validation
    if (this.usernameValue().trim().length < 3) {
      this.alertToast.openToast('Username must be at least 3 characters long.');
      this.errorMessage.set('Username must be at least 3 characters long.');
      return;
    }

    if (this.passwordValue() && this.passwordValue().length < 6) {
      this.alertToast.openToast('Password must be at least 6 characters.');
      this.errorMessage.set('Password must be at least 6 characters.');
      return;
    }

    if (this.confirmPasswordValue() && this.confirmPasswordValue().length < 6) {
      this.alertToast.openToast('Confirm Password must be at least 6 characters.');
      this.errorMessage.set('Confirm Password must be at least 6 characters.');
      return;
    }

    if (this.passwordValue() && this.passwordValue() !== this.confirmPasswordValue()) {
      this.alertToast.openToast('Passwords do not match.');
      this.errorMessage.set('Passwords do not match!');
      return;
    }

    // Update user
    this.username.set(this.usernameValue().trim());
    this.password.set(this.passwordValue() || user.password);

    const updated = { ...user, name: this.username(), password: this.password() };

    try {
      localStorage.setItem(user.email, JSON.stringify(updated));
      localStorage.setItem('auth_user', JSON.stringify(updated));
      this.success.set(true);
      this.errorMessage.set('');
      setTimeout(() => this.router.navigate(['/auth/profile']), 1500);
    } catch (error) {
      this.errorMessage.set('Failed to save user data.');
      console.error(error);
      this.alertToast.openToast(this.errorMessage());
    }
  }

  // Toggle visibility methods
  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleOldPassword(): void {
    this.showOldPassword.set(!this.showOldPassword());
  }

  goBack(): void {
    this.router.navigate(['/auth/profile']);
  }

}