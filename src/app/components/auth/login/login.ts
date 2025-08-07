import {
  Component,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { TranslateModule } from '@ngx-translate/core';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AcceptToasts
],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  // Variables
  email = signal('');
  password = signal('');

  // injects
  private router = inject(Router);
  private auth = inject(AuthService);


  // ViewChild acceptToast
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;


  // onSubmit
  onSubmit() {
    if (this.email() && this.password()) {
      const success = this.auth.login(this.email(), this.password());
      if (success) {
        this.acceptToast.openToast(`Welcome back, ${this.email()}!`);
        this.router.navigate(['/']);
      }
    }
  }

}