import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  private router = inject(Router);
  private auth = inject(AuthService);

  email = signal('');
  password = signal('');

  onSubmit() {
    if (this.email() && this.password()) {
      this.auth.login(this.email());
      alert(`Welcome back, ${this.email()}!`);
      this.router.navigate(['/']);
    }
  }
}
