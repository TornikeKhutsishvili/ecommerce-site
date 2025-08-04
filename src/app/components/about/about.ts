import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {

  companyName = 'TK Store';
  mission = 'We aim to provide high-quality products at the best prices while ensuring an exceptional shopping experience.';
  yearFounded = 2025;

}
