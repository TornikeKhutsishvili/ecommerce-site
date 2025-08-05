import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groceries',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './groceries.html',
  styleUrls: ['./groceries.scss']
})
export class Groceries {

}
