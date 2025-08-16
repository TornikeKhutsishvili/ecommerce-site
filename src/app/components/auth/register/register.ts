import {
  Component,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertToasts,
    AcceptToasts
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  // variables
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  // signals
  private router = inject(Router);
  private auth = inject(AuthService);


  // ViewChild acceptToast and alertToast
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;

  // Show and hide password
  get passwordMismatch() {
    return this.password() !== this.confirmPassword();
  }


  // onSubmit
  onSubmit() {

    if (this.passwordMismatch) {
      this.alertToast.openToast('Passwords do not match!');
      return;
    }

    if (this.name() && this.email() && this.password()) {
      const success = this.auth.register(this.name(), this.email(), this.password());

      if (success) {
        this.router.navigate(['/auth/login']);
        this.acceptToast.openToast('User registered successfully!');
      } else {
        this.alertToast.openToast('User with this email already exists!');
      }
    }

  }

}