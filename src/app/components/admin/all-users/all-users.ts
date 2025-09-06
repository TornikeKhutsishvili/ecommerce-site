import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  AuthService,
  User
} from '../../../services/auth-service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './all-users.html',
  styleUrls: ['./all-users.scss']
})
export class AllUsers implements OnInit {

  private authService = inject(AuthService);
  users: User[] = [];


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.authService.getAllUsers();
  }

  deleteUser(email: string): void {
    if (confirm(`ნამდვილად გსურს ${email}-ის წაშლა?`)) {
      localStorage.removeItem(email);
      this.loadUsers(); // refresh table
    }
  }

}