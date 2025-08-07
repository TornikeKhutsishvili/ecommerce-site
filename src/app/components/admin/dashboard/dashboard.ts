import {
  Component,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product-service';
import { RouterLink, RouterModule } from '@angular/router';
import { DeleteToasts } from '../../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from '../../toasts/accept-toasts/accept-toasts';
import { AlertToasts } from '../../toasts/alert-toasts/alert-toasts';
import { AddToasts } from '../../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterLink,
    RouterModule,
    DeleteToasts
],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  productService = inject(ProductService);
  products = signal<any[]>([]);
  loading = signal<boolean>(true);


  // All ViewChild
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;


  // ngOnInit
  ngOnInit() {
    this.loadProducts();
  }


  // load products
  loadProducts() {
    this.loading.set(true);
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
      this.loading.set(false);
    });
  }


  // delete product by id
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.set(this.products().filter(p => p.id !== id));
      this.deleteToast.openToast(`🗑 Product deleted: ${id}`);
    }
  }

}