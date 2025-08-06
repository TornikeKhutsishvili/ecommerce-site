import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-toasts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-toasts.html',
  styleUrls: ['./add-toasts.scss']
})
export class AddToasts {

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