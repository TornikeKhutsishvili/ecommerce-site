import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  private router = inject(Router);

  get passwordMismatch(): boolean {
    return this.password !== this.confirmPassword;
  }

  onSubmit() {
    if (this.passwordMismatch) {
      alert('Passwords do not match!');
      return;
    }
    // TODO: add your registration logic here (call API or service)
    if (this.name && this.email && this.password) {
      alert(`Welcome, ${this.name}! Your account has been created.`);
      this.router.navigate(['/login']); // redirect to login page
    }
  }

}