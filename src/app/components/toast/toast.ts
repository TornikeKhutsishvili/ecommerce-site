import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss']
})
export class Toast {

}
