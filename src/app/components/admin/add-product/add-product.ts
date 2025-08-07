import {
  Component,
  inject,
  signal,
  Signal,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';
import { AddToasts } from "../../toasts/add-toasts/add-toasts";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AddToasts
],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss']
})
export class AddProduct {

  productService = inject(ProductService);
  router = inject(Router);

  // ViewChild addToast
  @ViewChild('addToast') addToast!: AddToasts;


  // product object
  product: {
    title: Signal<string>;
    price: Signal<number>;
    description: Signal<string>;
    category: Signal<string>;
    image: Signal<string>;
  } = {
    title: signal(''),
    price: signal(0),
    description: signal(''),
    category: signal(''),
    image: signal('')
  };


  // save product
  saveProduct() {
    this.addToast.openToast(`Adding product: ${this.product.title()}`);
    this.router.navigate(['/admin']);
  }

}
