import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class Favorites {

}
