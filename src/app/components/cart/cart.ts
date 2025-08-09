import { CommonModule } from '@angular/common';

import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { SearchService } from '../../services/search-service';
import { FilterService } from '../../services/filter-service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToasts } from "../toasts/alert-toasts/alert-toasts";
import { DeleteToasts } from "../toasts/delete-toasts/delete-toasts";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AlertToasts,
    DeleteToasts
],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit, OnDestroy {

  // variables
  cartItems = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);
  totalPrice = signal<number>(0);

  private filterSubscription: Subscription | null = null;

  private cartService = inject(CartService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);


  // ViewChild deleteToast
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;


  // ngOnInit
  ngOnInit(): void {

    const items = this.cartService.getCartItems();

    this.cartItems.set(items);
    this.filteredProducts.set(items);
    this.calculateTotalPrice();


    // Insert in filter service
    this.filterService.setFilteredProducts(items);


    // All Products Search
    // this.searchService.searchQuery$.subscribe(query => {
    //   const filtered = this.filterService.getFilteredProducts()
    //     .filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
    //   this.filteredProducts.set(filtered);
    // });


    // All Products Filter
    // this.filterSubscription = this.filterService.filteredProducts$.subscribe(filtered => {
    //   this.filteredProducts.set(filtered);
    // });



    // search products
    this.searchService.searchQuery$.subscribe(query => {
      if (!query.trim()) {
        this.filteredProducts.set(this.cartItems()); // All on empty
      } else {
        const filtered = this.cartItems().filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        this.filteredProducts.set(filtered);
      }
    });



    // Subscribe to filtered products updates from the service
    this.filterSubscription = this.filterService.filteredProducts$.subscribe(filtered => {
      if (filtered.length > 0) {
        const categoryFiltered = filtered.filter(p =>
          this.cartItems().some(prod => prod.id === p.id)
        );
        this.filteredProducts.set(categoryFiltered);
      } else {
        this.filteredProducts.set(this.cartItems());
      }
    });

  }



  // Update quantity
  updateQuantity(productId: number, quantity: number): void {
    if (quantity >= 1) { // At least 1 product
      this.cartService.updateQuantity(productId, quantity); // Update to LocalStorage

      const updated = this.cartService.getCartItems();
      this.cartItems.set(updated);
      this.filteredProducts.set(updated);
      this.calculateTotalPrice();
    }
  }



  // Remove product from cart
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId); // Delete from localStorage

    const updated = this.cartService.getCartItems();
    this.cartItems.set(updated);
    this.filteredProducts.set(updated);
    this.calculateTotalPrice();

    this.deleteToast.openToast('delete product');
  }



  // Calculate the total amount
  calculateTotalPrice(): void {
    const total = this.cartItems().reduce((acc, item) => {
      return acc + (item?.price * item?.quantity || 0);
    }, 0);

    this.totalPrice.set(total);
  }



  // apply filter
  applyPriceFilter(price: number) {
    const filtered = this.filterService.filterByPrice(this.filteredProducts(), price);
    this.filterService.setFilteredProducts(filtered); // Set filtered products in the service
  }



  // ngOnDestroy
  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

}
