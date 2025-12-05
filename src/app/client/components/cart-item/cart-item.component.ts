import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductCartItem, ProductEntity} from '@entities/product.entity';
import {assetImageUrl} from '@app/utils/asset-image-url.util';
import {CurrencyPipe, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  imports: [
    CurrencyPipe,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input({ required: true }) product!: ProductCartItem;
  @Input() hideactions: boolean = false;

  @Output() productRemoved = new EventEmitter<string>();
  @Output() addOneMoreProduct = new EventEmitter<ProductEntity>();
  @Output() removeOneProduct = new EventEmitter<string>();

  get mainImage() {
    return assetImageUrl(this.product.images[0]?.path || '');
  }

  get totalPrice() {
    let price = this.product.basePrice;
    console.log(price)
    if (price === undefined) price = this.product.productPrice || '0';
    return +price * (this.product.quantity || 1);
  }

  removeProduct() {
    this.productRemoved.emit(this.product.id);
  }

  addOneMore() {
    const product: ProductEntity = { ...this.product };
    this.addOneMoreProduct.emit(product);
  }

  removeOne() {
    this.removeOneProduct.emit(this.product.id);
  }
}
