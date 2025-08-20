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

import {
  AuthService,
  User
} from '../../../services/auth-service';

import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
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
  private router = inject(Router);

  // Toasts
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // user data
  user: User | null = null;
  avatarImg = signal('https://www.w3schools.com/w3images/avatar2.png');

  // toggle edit/view mode
  editMode = signal<boolean>(false);


  // lifecycle hook ngOnInit
  ngOnInit(): void {
    this.user = this.auth.getUser();

    if (this.user && !this.user.city) {
      this.user.city = '';
    }
  }


  // Georgian Cities
  cities = signal<string[]>([
    'Tbilisi', 'Abasha', 'Adigeni', 'Akhalkalaki', 'Akhaltsikhe', 'Akhmeta', 'Ambrolauri', 'Aspindza',
    'Baghdati', 'Batumi', 'Bolnisi', 'Borjomi', 'Chiatura', 'Chokhatauri', 'Dedoplistskaro', 'Dmanisi',
    'Dusheti', 'Gardabani', 'Gori', 'Gurjaani', 'Kareli', 'Kaspi', 'Keda', 'Khashuri', 'Khelvachauri',
    'Khobi', 'Khoni', 'Khulo', 'Kobuleti', 'Kutaisi', 'Lagodekhi', 'Lanchkhuti', 'Lentekhi', 'Marneuli',
    'Martvili', 'Mestia', 'Mtskheta', 'Ninotsminda', 'Oni', 'Ozurgeti', 'Poti', 'Rustavi', 'Samtredia',
    'Senaki', 'Sighnaghi', 'Sokhumi', 'Stepantsminda', 'Telavi', 'Terjola', 'Tetritskaro', 'Tkibuli',
    'Tsageri', 'Tsalenjikha', 'Tsalka', 'Tskaltubo', 'Tskhinvali', 'Vani', 'Zestafoni', 'Zugdidi'
  ]);


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
        this.editMode.set(false);
      } else {
        this.alertToast.openToast('Failed to update profile ❌');
      }
    }
  }


  // error on Image
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = this.avatarImg();
  }


  // Upload photo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.user) {
          this.user.photoUrl = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  // go back
  goBack(): void {
    this.router.navigate(['/auth/profile']);
  }

}
