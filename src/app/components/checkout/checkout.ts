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
import { PaymentService } from '../../services/payment-service';
import { CartService } from '../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteToasts } from '../toasts/delete-toasts/delete-toasts';
import { AcceptToasts } from "../toasts/accept-toasts/accept-toasts";
import { AlertToasts } from "../toasts/alert-toasts/alert-toasts";
import { AddToasts } from '../toasts/add-toasts/add-toasts';
import { OrderService } from '../../services/orders-service';
import { OrderItem } from '../../interfaces/order-item.interface';
import { CreateOrderDto } from '../../interfaces/order.interface';
import { PaymentProvider } from '../../interfaces/payment-provider.type';

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

  // Toasts
  @ViewChild('deleteToast') deleteToast!: DeleteToasts;
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;
  @ViewChild('addToast') addToast!: AddToasts;

  // Signals
  cartItems = computed(() => this.cartService.cartItems());
  totalPrice = computed(() => this.cartItems().reduce((acc, i) => acc + i.price * i.quantity, 0));

  paymentMethod = signal<'Cash_on_Delivery' | 'Credit Card' | 'PayPal'>('Cash_on_Delivery');

  userName = signal('');
  userEmail = signal('');
  userAddress = signal('');
  cardNumber = signal('');
  expiryDate = signal('');
  cvv = signal('');
  paypalEmail = signal('');

  orderId = signal('');

  // Inject services
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private paymentService = inject(PaymentService);


  // Cart operations
  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) return this.removeFromCart(productId);
    this.cartService.updateQuantity(productId, quantity);
  }


  // remove product from cart
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.deleteToast.openToast('Product removed from cart');
  }


  // Checkout
  completeCheckout() {
    if (!this.userName() || !this.userEmail() || !this.userAddress()) {
      return this.alertToast.openToast('Please fill all required fields');
    }

    if (this.cartItems().length === 0) {
      return this.alertToast.openToast('Cart is empty');
    }

    const orderItems: OrderItem[] = this.cartItems().map(item => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    const orderDto: CreateOrderDto = {
      userId: this.userEmail(),
      items: orderItems,
      currency: 'USD',
      address: {
        fullName: this.userName(),
        phone: '',
        line1: this.userAddress(),
        city: '',
        country: '',
        zip: ''
      }
    };

    this.orderService.createOrder(orderDto).subscribe(order => {
      if (!order) return this.alertToast.openToast('Failed to create order');

      this.orderId.set(order.id);

      if (this.paymentMethod() === 'Cash_on_Delivery') {
        this.cartService.clearCart();
        this.acceptToast.openToast(`Order ${order.id} completed successfully!`);
      } else {
        this.pay(this.paymentMethod() === 'Credit Card' ? 'stripe' : 'paypal');
      }
    });
  }


  // Payment
  pay(provider: PaymentProvider) {
    this.paymentService.createCheckout({
      provider,
      orderId: this.orderId(),
      successUrl: window.location.origin + '/checkout/success',
      cancelUrl: window.location.origin + '/checkout/cancel'
    }).subscribe(res => {
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      } else {
        this.alertToast.openToast('Failed to initialize payment');
      }
    });
  }


  // Payment method selection
  onPaymentMethodChange(method: 'Cash_on_Delivery' | 'Credit Card' | 'PayPal') {
    this.paymentMethod.set(method);
    this.acceptToast.openToast(`Payment method selected: ${method}`);
  }


  // Card formatting
  formatCardNumber() {
    let formatted = this.cardNumber().replace(/\D/g, '');
    if (formatted.length > 4) {
      formatted = formatted.replace(/(\d{4})(?=\d)/g, '$1-');
    }
    this.cardNumber.set(formatted);
  }


  // Form validation
  get isFormValid() {
    return !!(this.userName() && this.userEmail() && this.userAddress());
  }

}