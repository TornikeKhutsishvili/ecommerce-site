import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './faq.html',
  styleUrls: ['./faq.scss']
})
export class FAQ {

  public faqs = [

    {
      q: 'How do I place an order?',
      a: 'Add products to cart and follow checkout.'
    },

    {
      q: 'What payment methods do you accept?',
      a: 'We accept cards, Paypal and bank transfer.'
    }

  ];

}