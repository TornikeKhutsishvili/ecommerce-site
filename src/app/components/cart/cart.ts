import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart {

  cartItems = signal<any[]>([]);
  totalPrice = signal<number>(0);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartItems.set(this.cartService.getCartItems());  // Restore cart data from LocalStorage
    this.calculateTotalPrice();
  }

  // Update quantity
  updateQuantity(productId: number, quantity: number): void {
    if (quantity >= 1) { // At least 1 product
      this.cartService.updateQuantity(productId, quantity);  // Update in LocalStorage
      this.cartItems.set(this.cartService.getCartItems());  // Update cart
      this.calculateTotalPrice();  // Update total amount
    }
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);  // Delete from LocalStorage
    this.cartItems.set(this.cartService.getCartItems());  // Update cart
    this.calculateTotalPrice();  // Update total amount
  }

  // Calculate the total price of products in the cart
  calculateTotalPrice(): void {
    const total = this.cartItems().reduce((acc, item) => {
      return acc + (item?.price * item?.quantity || 0);
    }, 0);

    this.totalPrice.set(total);
  }

}
