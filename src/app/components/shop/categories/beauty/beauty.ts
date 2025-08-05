import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beauty',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './beauty.html',
  styleUrls: ['./beauty.scss']
})
export class Beauty {

}
