import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
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

}
