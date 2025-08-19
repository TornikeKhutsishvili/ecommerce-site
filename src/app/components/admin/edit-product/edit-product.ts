import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { DeleteToasts } from '../../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts,
    DeleteToasts,
    AddToasts
],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.scss']
})
export class EditProduct implements OnInit {

  productService = inject(ProductService);
  private translate = inject(TranslateService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<any>({});

  // All ViewChild
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;


  // ngOnInit
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (product) => this.product.set(product),
      error: () => this.alertToast.openToast('Product not found')
    });
  }


  // update product
  updateProduct() {
    const prod = this.product();
    if (!prod.title || !prod.price) {
      this.alertToast.openToast('Title and Price are required');
      return;
    }
    // call ProductService.updateProduct if available
    this.acceptToast.openToast(`Updating product: ${prod.title}`);
    setTimeout(() => this.router.navigate(['/admin/dashboard']), 600);
  }

  onTitleChange(val: string) {
    this.product.update(p => (
      { ...p, title: this.translate.instant(val) }
    ));
  }

  onPriceChange(val: number | string) {
    const num = typeof val === 'string' ? +val : val;
    this.product.update(p => (
      { ...p, price: num ?? 0 }
    ));
  }

  onCategoryChange(val: string) {
    this.product.update(p => (
      { ...p, category: this.translate.instant(val) }
    ));
  }

  onThumbChange(val: string) {
    this.product.update(p => (
      { ...p, thumbnail: this.translate.instant(val) }
    ));
  }

  onDescChange(val: string) {
    this.product.update(p => (
      { ...p, description: this.translate.instant(val) }
    ));
  }

}