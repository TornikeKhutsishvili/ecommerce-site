import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../../services/product-service';
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
    NgxPaginationModule,
    DeleteToasts,
    AcceptToasts,
    AlertToasts,
    AddToasts
],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  productService = inject(ProductService);
  products = signal<any[]>([]);
  loading = signal<boolean>(true);
  page = signal<number>(1);
  itemsPerPage = signal<number>(25);


  // All ViewChild
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;


  ngOnInit() {
    this.loadProducts();
  }


  // load products
  loadProducts() {
    this.loading.set(true);

    const getProducts = this.productService.getProducts();
    getProducts.subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
        this.acceptToast.openToast('Products loaded successfully');
      },
      error: () => {
        this.alertToast.openToast('Failed to load products');
        this.loading.set(false);
      }
    });
  }


  // Paginated view
  readonly filteredProducts = computed(() => this.products());
  readonly paginatedProducts = computed(() => {
    const start = (this.page() - 1) * this.itemsPerPage();
    return this.filteredProducts().slice(start, start + this.itemsPerPage());
  });


  // delete product by id
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.set(this.products().filter(p => p.id !== id));
      this.deleteToast.openToast(`🗑 Product deleted: ${id}`);
    }
  }


}