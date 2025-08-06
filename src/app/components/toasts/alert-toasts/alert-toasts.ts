import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert-toasts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './alert-toasts.html',
  styleUrls: ['./alert-toasts.scss']
})
export class AlertToasts {

  showToast = signal(false);
  message = 'Warning: Something went wrong!';

  openToast() {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  closeToast() {
    this.showToast.set(false);
  }

}
