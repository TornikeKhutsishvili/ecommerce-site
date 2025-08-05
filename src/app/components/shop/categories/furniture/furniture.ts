import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-furniture',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './furniture.html',
  styleUrls: ['./furniture.scss']
})
export class Furniture {

}
