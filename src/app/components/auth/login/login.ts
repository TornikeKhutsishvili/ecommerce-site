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

  email = signal('');
  password = signal('');

  private router = inject(Router);
  private auth = inject(AuthService);

  onSubmit() {
    if (this.email() && this.password()) {
      const success = this.auth.login(this.email(), this.password());
      if (success) {
        alert(`Welcome back, ${this.email()}!`);
        this.router.navigate(['/']);
      }
    }
  }

}