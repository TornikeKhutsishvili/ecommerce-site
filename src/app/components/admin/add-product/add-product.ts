import {
  Component,
  inject,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { AddToasts } from "../../toasts/add-toasts/add-toasts";
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AddToasts,
    AlertToasts,
    RouterLink,
    RouterModule
],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss']
})
export class AddProduct {

  productService = inject(ProductService);
  router = inject(Router);

  // ViewChild addToast
  @ViewChild('addToast') addToast!: AddToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;


  // product object
  product: {
    title: WritableSignal<string>;
    price: WritableSignal<number>;
    description: WritableSignal<string>;
    category: WritableSignal<string>;
    image: WritableSignal<string>;
  } = {
    title: signal(''),
    price: signal(0),
    description: signal(''),
    category: signal(''),
    image: signal('')
  };


  // save product method
  saveProduct() {
    const payload = {
      title: this.product.title(),
      price: this.product.price(),
      description: this.product.description(),
      category: this.product.category(),
      thumbnail: this.product.image()
    } as any;

    if (!payload.title || !payload.price) {
      this.alertToast.openToast('Please fill Title and Price');
      return;
    }

    // If you have a real API, call productService.addProduct(payload)
    // this.productService.addProduct(payload).subscribe({
    //   next: () => this.handleSuccess(payload),
    //   error: (error) => {
    //     console.error('Error adding product:', error);
    //     this.alertToast.openToast('Failed to add product. Please try again.');
    //   }
    // });

    // For now, just show toast and navigate
    this.addToast.openToast(`Adding product: ${payload.title}`);
    setTimeout(() => this.router.navigate(['/admin/dashboard']), 900);
  }

}
