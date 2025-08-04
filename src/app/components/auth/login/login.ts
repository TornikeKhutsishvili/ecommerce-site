import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  private router = inject(Router);

  email = '';
  password = '';

  onSubmit() {
    // TODO: add your login logic here (call API or service)
    if (this.email && this.password) {
      alert(`Welcome back, ${this.email}!`);
      this.router.navigate(['/']); // redirect to homepage or dashboard
    }
  }

}