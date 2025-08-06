import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  message = 'Action completed successfully!';

  openToast() {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  closeToast() {
    this.showToast.set(false);
  }

}
