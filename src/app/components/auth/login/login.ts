import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

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

  email = '';
  password = '';

  onSubmit() {
    if (this.email && this.password) {
      alert(`Welcome back, ${this.email}!`);
      this.router.navigate(['/']); // redirect to homepage or dashboard
    }
  }

}