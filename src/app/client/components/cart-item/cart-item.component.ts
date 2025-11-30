import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductCartItem, ProductEntity} from '@entities/product.entity';
import {assetImageUrl} from '@app/utils/asset-image-url.util';
import {CurrencyPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  imports: [
    CurrencyPipe,
    MatIconModule,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input({ required: true }) product!: ProductCartItem;

  @Output() productRemoved = new EventEmitter<string>();
  @Output() addOneMoreProduct = new EventEmitter<ProductEntity>();
  @Output() removeOneProduct = new EventEmitter<string>();

  get mainImage() {
    return assetImageUrl(this.product.images[0]?.path || '');
  }

  get totalPrice() {
    return +this.product.basePrice * (this.product.quantity || 1);
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
