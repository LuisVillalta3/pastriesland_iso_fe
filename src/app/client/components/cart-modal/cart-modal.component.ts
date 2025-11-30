import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CartService} from '@client/services/cart.service';
import {ProductCartItem, ProductEntity} from '@entities/product.entity';
import {Subscription} from 'rxjs';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {CartItemComponent} from '@client/components/cart-item/cart-item.component';
import {NotificationService} from '@services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  imports: [
    CurrencyPipe,
    CartItemComponent,
    NgForOf,
  ],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.scss'
})
export class CartModalComponent implements OnInit, OnDestroy {

  currentCart: ProductEntity[] = [];
  productCartItems: ProductCartItem[] = [];

  sub!: Subscription

  constructor(
    private dialogRef: MatDialogRef<CartModalComponent>,
    private cartService: CartService,
    private notification: NotificationService,
    private router: Router
  ) {}

  close() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.sub = this.cartService.cartProducts$.subscribe(
      products => {
        if (!products.length) {
          this.close()
          this.notification.show("No hay productos en el carrito", 'info')
          return;
        }

        this.currentCart = products

        this.productCartItems = this.cartService.generateProductCartItems(products);
      }
    )
  }

  get totalPrice() {
    return this.cartService.getCartPrice();
  }

  get countProducts() {
    return this.currentCart.length
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  removeProduct(productId: string) {
    this.cartService.removeProductFromCart(productId);
  }

  async checkout() {
    await this.router.navigate(['checkout'])
    this.close()
  }

  removeOneProduct(productId: string) {
    this.cartService.removeOneProductFromCart(productId);
  }

  addOneMore(product: ProductEntity) {
    this.cartService.addProductToCart(product);
  }
}
