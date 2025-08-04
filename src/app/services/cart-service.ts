import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';  // Key of LocalStorage

  // Add product to cart
  addToCart(product: any): void {
    let cartItems = this.getCartItems();  // Restore cart from LocalStorage
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // If the product already exists, the quantity should be increased
    } else {
      cartItems.push({
        ...product,
        image: product.thumbnail || product.images?.[0],
        quantity: 1
      }); // Add new product
    }

    this.saveCartItems(cartItems);  // save cart in LocalStorage
  }

  // Return the list of products in the cart
  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];  // If LocalStorage is empty, then return an empty array
  }

  // Update product quantity in the cart
  updateQuantity(productId: number, quantity: number): void {
    let cartItems = this.getCartItems();
    const product = cartItems.find(item => item.id === productId);

    if (product) {
      product.quantity = quantity;  // Update product quantity
      this.saveCartItems(cartItems);  // Update the cart in LocalStorage
    }
  }

  // Delete product from cart
  removeFromCart(productId: number): void {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(item => item.id !== productId);  // Remove product from the cart

    this.saveCartItems(cartItems);  /// Update the cart in LocalStorage
  }

  // Save cart data to LocalStorage
  private saveCartItems(cartItems: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));  // Save cart to LocalStorage
  }

  // Clear the cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);  // Clear cart data from LocalStorage
  }

}
