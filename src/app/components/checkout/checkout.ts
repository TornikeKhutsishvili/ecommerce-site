import {
  Component,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteToasts } from '../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from "../toasts/accept-toasts/accept-toasts";
import { AlertToasts } from "../toasts/alert-toasts/alert-toasts";
import { AddToasts } from '../toasts/add-toasts/add-toasts';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts,
    DeleteToasts
],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class Checkout implements OnInit {

  paymentMethod = signal('Cash_on_Delivery');
  cartItems = signal<any[]>([]);
  totalPrice = signal<number>(0);

  private cartService = inject(CartService);

  // ViewChilds
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;


  // user object
  user: {
    name: Signal<string>;
    email: Signal<string>;
    address: Signal<string>;
    paymentMethod: Signal<string>;
  } = {
    name: signal(''),
    email: signal(''),
    address: signal(''),
    paymentMethod: signal('Credit Card')
  };


  // Form fields
  cardNumber = signal<string>('');
  expiryDate = signal<string>('');
  cvv = signal<string>('');
  paypalEmail = signal<string>('');

  constructor() {}


  // ngOnInit
  ngOnInit(): void {
    this.cartItems.set(this.cartService.getCartItems() || []);
    this.calculateTotalPrice();
  }



  // Complete the checkout process  // Form submission handler
  completeCheckout(): void {
    if (!this.user.name() || !this.user.email() || !this.user.address()) {
      this.alertToast.openToast(`warning`);
      return;
    }

    // Empty the cart
    this.cartService.clearCart();
    this.acceptToast.openToast(`Checkout completed for ${this.user.name()}`);
  }



  // calculate Total Price
  calculateTotalPrice(): void {
    const total = this.cartItems().reduce((acc, item) => {
      return acc + (item?.price * item?.quantity || 0);
    }, 0);

    this.totalPrice.set(total);  // update signal
  }



  // Handle payment method selection change
  onPaymentMethodChange(newMethod: string) {
    this.paymentMethod.set(newMethod);
    this.acceptToast.openToast(`Order submitted with payment method: ${this.paymentMethod()}`);
  }



  // Format the card number as the user types
  formatCardNumber(): void {
    // Remove all non-digit characters
    let formattedCardNumber = this.cardNumber().replace(/\D/g, '');

    // Split the digits into groups of 4 and join with '-'
    if (formattedCardNumber.length > 4) {
      formattedCardNumber = formattedCardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
    }

    // Update the cardNumber with formatted value
    this.cardNumber.set(formattedCardNumber);
  }



  // update Quantity
  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    this.calculateTotalPrice();
    this.cartService.updateQuantity(productId, newQuantity);
  }



  // Product remove from cart
  removeFromCart(productId: number): void {

    this.cartItems.update(items => items.filter(item => item.id !== productId));
    this.calculateTotalPrice();
    this.cartService.removeFromCart(productId);
    this.deleteToast.openToast(`delete product`);

  }

}