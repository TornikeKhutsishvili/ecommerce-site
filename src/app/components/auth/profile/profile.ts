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

  // varibles
  auth = inject(AuthService);
  private router = inject(Router);

  user: any;

  // ngOnInit
  ngOnInit(): void {
    this.user = this.auth.getUser();
  }


  // logout
  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }


  // Edit Profile
  goToEditProfile(): void {
    this.router.navigate(['/auth/edit-profile']);
  }


  // reset password
  resetPass() {
    this.router.navigate(['/auth/reset-password']);
  }

}