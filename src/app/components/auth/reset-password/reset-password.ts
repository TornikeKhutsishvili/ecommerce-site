import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPassword {

  // variables
  email = signal('');
  newPassword = signal('');
  error = signal('');
  success = signal(false);

  private auth = inject(AuthService)
  private router = inject(Router);


  // reset password
  reset(): void {
    const user = this.auth.getUserByEmail(this.email());

    if (!user) {
      this.error.set('User not found!');
      this.success.set(false);
      return;
    }

    // Update password
    user.password = this.newPassword();

    try {
      // Save updated user
      localStorage.setItem(user.email, JSON.stringify(user));

      // If currently logged in, update current session too
      const current = this.auth.getUser();
      if (current?.email === user.email) {
        localStorage.setItem('auth_user', JSON.stringify(user));
      }

      this.success.set(true);
      this.error.set('');

      setTimeout(() => this.router.navigate(['/login']), 2000);
    } catch (error) {
      this.error.set('Failed to reset password.');
      this.success.set(false);
      console.error(error);
    }
  }


  // on email input
  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }


  // on password input
  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newPassword.set(input.value);
  }

}
