import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './terms.html',
  styleUrls: ['./terms.scss']
})
export class Terms {

}
