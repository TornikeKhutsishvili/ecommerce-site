import {
  Component,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AddToasts
],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails {

  product = signal<any>('');

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  @ViewChild('addToast') addToast!: AddToasts;


  // ngOnInit
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const id = Number(productId);
    if (productId) {
      this.productService.getProductById(id).subscribe((data) => {
        this.product.set(data);
      });
    }
  }


  // add product to cart
  addToCart() {
    this.cartService.addToCart(this.product);
    this.addToast.openToast('Product added to cart! 🛒');
  }


  // back
  goBack() {
    this.location.back();
  }

}