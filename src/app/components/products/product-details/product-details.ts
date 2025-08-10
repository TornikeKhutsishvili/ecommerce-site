import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
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
    RouterModule,
    FormsModule,
    TranslateModule,
    AddToasts
],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetails implements OnInit {

  // variables
  product = signal<any>('');
  stars = signal<any>([1, 2, 3, 4, 5]);

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  // ViewChild addToast
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



  // get star fill percent
  getStarFillPercent(productRating: number, star: number): number {
    if (star <= Math.floor(productRating)) {
      return 100;
    }
    if (star === Math.floor(productRating) + 1) {
      return (productRating - Math.floor(productRating)) * 100;
    }

    return 0;
  }



  // add product to cart
  addToCart() {
    this.cartService.addToCart(this.product);
    this.addToast.openToast('Product added to cart! 🛒');
  }



  // back
  goBack(scrollToTop: boolean = false) {
    this.location.back();

    if (scrollToTop) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }

}
