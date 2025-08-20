import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  Component,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AuthService, User } from '../../../services/auth-service';
import { AlertToasts } from "../../toasts/alert-toasts/alert-toasts";
import { AcceptToasts } from "../../toasts/accept-toasts/accept-toasts";
import { DeleteToasts } from "../../toasts/delete-toasts/delete-toasts";

@Component({
  selector: 'app-user-profile-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AlertToasts,
    AcceptToasts,
    DeleteToasts
],
  templateUrl: './user-profile-info.html',
  styleUrls: ['./user-profile-info.scss']
})
export class UserProfileInfo implements OnInit {

  // inject Service
  private auth = inject(AuthService);

  // Toasts
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // user data
  user: User | null = null;

  avatarImg = signal('https://www.w3schools.com/w3images/avatar2.png');


  // lifecycle hook ngOnInit
  ngOnInit(): void {
    this.user = this.auth.getUser();
  }


  // method to save profile
  saveProfile() {
    if (!this.user) {
      return this.alertToast.openToast('No user found');
    }

    if (isPlatformBrowser(this.platformId)) {
      // update storage via AuthService
      const updated = this.auth.updateUser(this.user);
      if (updated) {
        this.acceptToast.openToast('Profile updated successfully ✅');
      } else {
        this.alertToast.openToast('Failed to update profile ❌');
      }
    }
  }


  // error on Image
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = this.avatarImg();
  }

}
