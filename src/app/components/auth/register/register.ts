import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AlertToasts
],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  private router = inject(Router);
  private auth = inject(AuthService);

  @ViewChild('alertToast') alertToast!: AlertToasts;

  get passwordMismatch() {
    return this.password() !== this.confirmPassword();
  }

  onSubmit() {
    if (this.passwordMismatch) {
      this.alertToast.openToast('Passwords do not match!');
      return;
    }
    if (this.name() && this.email() && this.password()) {
      this.auth.register(this.name(), this.email(), this.password());
      this.router.navigate(['/login']);
    }
  }

}
