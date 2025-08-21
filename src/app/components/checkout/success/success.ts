import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteToasts } from '../../toasts/delete-toasts/delete-toasts';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts,
    DeleteToasts
  ],
  templateUrl: './success.html',
  styleUrls: ['./success.scss']
})
export class Success {

}
