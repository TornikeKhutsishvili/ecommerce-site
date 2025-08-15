import {
  Component,
  signal
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { About } from "../about/about";
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    About,
    TranslateModule
],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

  currentYear = signal(new Date().getFullYear());

  address = signal('https://maps.google.com/?q=123+Popular+St,+Tbilisi,+Georgia');
  phone = signal('+995599123456789');
  email = signal('support@tkshop.com');

  // Social Media Links
  facebook = signal('https://www.facebook.com');
  instagram = signal('https://www.instagram.com');
  twitter = signal('https://www.twitter.com');
  linkedIn = signal('https://www.linkedin.com');

}
