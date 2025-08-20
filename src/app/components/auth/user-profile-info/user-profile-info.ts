import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-user-profile-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './user-profile-info.html',
  styleUrls: ['./user-profile-info.scss']
})
export class UserProfileInfo implements OnInit {

  // inject Service
  private auth = inject(AuthService);

  // user data
  user: any;


  // lifecycle hook ngOnInit
  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

}
