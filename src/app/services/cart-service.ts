import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems'; // Key of LocalStorage
  cartItems = signal<any[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(this.cartKey);
    this.cartItems.set(stored ? JSON.parse(stored) : []);
  }

  private saveToStorage() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems()));
  }

  addToCart(product: any): void {
    const items = [...this.cartItems()];
    const existing = items.find(i => i.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        ...product,
        image: product.thumbnail || product.images?.[0],
        quantity: 1
      });
    }
    this.cartItems.set(items);
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.cartItems().map(i =>
      i.id === productId ? { ...i, quantity } : i
    );
    this.cartItems.set(items);
    this.saveToStorage();
  }

  removeFromCart(productId: number): void {
    const items = this.cartItems().filter(i => i.id !== productId);
    this.cartItems.set(items);
    this.saveToStorage();
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems.set([]);
    localStorage.removeItem(this.cartKey); // Clear cart data from LocalStorage
  }

}