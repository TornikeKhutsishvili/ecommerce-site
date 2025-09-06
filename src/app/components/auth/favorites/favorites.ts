import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class Favorites {

}
