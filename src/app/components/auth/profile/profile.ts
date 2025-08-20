import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {

  // inject Service and Router
  auth = inject(AuthService);
  private router = inject(Router);

  // user data
  user: any;

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  goToEditProfile(): void {
    this.router.navigate(['/auth/edit-profile']);
  }

  resetPass() {
    this.router.navigate(['/auth/reset-password']);
  }

  goToMyProfile(): void {
    this.router.navigate(['/auth/my-profile']);
  }

}
