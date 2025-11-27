import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProductEntity} from '@entities/product.entity';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts = new BehaviorSubject<ProductEntity[]>([]);
  cartProducts$ = this.cartProducts.asObservable();

  constructor(private cookieService: CookieService) {
    this.loadCartFromCookies()
  }

  addProductToCart(product: ProductEntity) {
    const currentCart = this.cartProducts.getValue();
    this.cartProducts.next([...currentCart, product]);
    this.saveCartToCookies()
  }

  removeProductFromCart(productId: string) {
    const currentCart = this.cartProducts.getValue();
    const updatedCart = currentCart.filter(product => product.id !== productId);
    this.cartProducts.next(updatedCart);
    this.saveCartToCookies();
  }

  clearCart() {
    this.cartProducts.next([]);
  }

  getCartProducts(): ProductEntity[] {
    return this.cartProducts.getValue();
  }

  getCartPrice(): number {
    const currentCart = this.cartProducts.getValue();
    return currentCart.reduce((total, product) => {
      const price = parseFloat(product.basePrice);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  }

  private loadCartFromCookies() {
    const cartData = this.cookieService.get('cart');
    if (cartData) {
      try {
        const products: ProductEntity[] = JSON.parse(cartData);
        this.cartProducts.next(products);
      } catch (error) {
        this.cartProducts.next([]);
      }
    } else {
      this.cartProducts.next([]);
    }
  }

  private saveCartToCookies() {
    const cart = this.cartProducts.getValue();
    const cartData = JSON.stringify(cart);
    this.cookieService.set('cart', cartData, 7, '/'); // Expires in 7 days
  }
}
