import {
  Component,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accept-toasts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './accept-toasts.html',
  styleUrls: ['./accept-toasts.scss']
})
export class AcceptToasts {

  showToast = signal(false);
  message = signal<string>('');

  openToast(msg: string) {
    this.message.set(msg);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  closeToast() {
    this.showToast.set(false);
  }

}
