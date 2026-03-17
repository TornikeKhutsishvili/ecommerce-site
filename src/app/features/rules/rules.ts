
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './rules.html',
  styleUrls: ['./rules.scss']
})
export class Rules {
}