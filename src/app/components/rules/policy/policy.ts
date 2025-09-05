import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './policy.html',
  styleUrls: ['./policy.scss']
})
export class Policy {

}
