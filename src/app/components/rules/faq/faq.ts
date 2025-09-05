import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class FAQ {

}
