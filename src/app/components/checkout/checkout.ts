import {
  Component,
  computed,
  inject,
  signal,
  ViewChild
} from '@angular/core';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
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
export class Checkout {

  // ViewChilds all Toasts
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;

  // Payment method
  paymentMethod = signal<'Cash_on_Delivery' | 'Credit Card' | 'PayPal'>('Cash_on_Delivery');

  // Inject services
  private cartService = inject(CartService);

  // Reactive cart items directly from CartService
  cartItems = computed(() => this.cartService.cartItems());

  // Total price computed automatically
  totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  // User object
  user = {
    name: signal(''),
    email: signal(''),
    address: signal(''),
    paymentMethod: signal<'Cash_on_Delivery' | 'Credit Card' | 'PayPal'>('Credit Card')
  };

  // Form fields
  cardNumber = signal('');
  expiryDate = signal('');
  cvv = signal('');
  paypalEmail = signal('');


  // Update quantity
  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartService.updateQuantity(productId, newQuantity);
  }


  // Remove product
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.deleteToast.openToast('Product deleted');
  }


  // Complete checkout
  completeCheckout() {
    if (!this.user.name() || !this.user.email() || !this.user.address()) {
      this.alertToast.openToast('Please fill all required fields');
      return;
    }

    this.cartService.clearCart();
    this.acceptToast.openToast(`Checkout completed for ${this.user.name()}`);
  }


  // Handle payment method change
  onPaymentMethodChange(newMethod: 'Cash_on_Delivery' | 'Credit Card' | 'PayPal') {
    this.paymentMethod.set(newMethod);
    this.acceptToast.openToast(`Payment method: ${this.paymentMethod()}`);
  }

  // Format card number
  formatCardNumber() {
    let formatted = this.cardNumber().replace(/\D/g, '');
    if (formatted.length > 4) {
      formatted = formatted.replace(/(\d{4})(?=\d)/g, '$1-');
    }
    this.cardNumber.set(formatted);
  }

}