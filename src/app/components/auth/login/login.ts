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
import { AuthService } from '../../../services/auth-service';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts
],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  email = signal('');
  password = signal('');

  private router = inject(Router);
  private auth = inject(AuthService);

  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;

  onSubmit() {
    if (this.email() && this.password()) {
      const success = this.auth.login(this.email(), this.password());

      if (success) {
        const user = this.auth.getUser();
        this.acceptToast.openToast(`Welcome back, ${user?.name || 'User'}!`);
        setTimeout(() => {
          this.acceptToast.closeToast();
          this.router.navigate(['/']);
        }, 2000);
      } else {
        this.alertToast.openToast('Invalid email or password!');
      }
    }
  }

}
