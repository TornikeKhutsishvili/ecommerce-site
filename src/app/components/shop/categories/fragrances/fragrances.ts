import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fragrances',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './fragrances.html',
  styleUrls: ['./fragrances.scss']
})
export class Fragrances {

}
