import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-toasts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './delete-toasts.html',
  styleUrls: ['./delete-toasts.scss']
})
export class DeleteToasts {

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