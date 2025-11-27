import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductEntity} from '@entities/product.entity';
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
  @Input({ required: true }) product!: ProductEntity;

  @Output() productRemoved = new EventEmitter<string>();

  get mainImage() {
    return assetImageUrl(this.product.images[0]?.path || '');
  }

  removeProduct() {
    this.productRemoved.emit(this.product.id);
  }
}
