import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProductEntity} from '@entities/product.entity';
import {assetImageUrl} from '@app/utils/asset-image-url.util';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {CartService} from '@client/services/cart.service';
import {NotificationService} from '@services/notification.service';

@Component({
  selector: 'app-product-modal',
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  product!: ProductEntity

  constructor(
    private dialogRef: MatDialogRef<ProductModalComponent>,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
  ) {
    this.product = data.product;
  }

  get mainImage() {
    return assetImageUrl(this.product.images[0]?.path || '');
  }

  get hasPortions() {
    return this.product.minPortions;
  }

  get portionText() {
    if (!this.hasPortions) return '';
    if (!this.product.maxPortions) {
      return `${this.product.minPortions} porciones`;
    }
    return `${this.product.minPortions} - ${this.product.maxPortions} porciones`;
  }

  get hasUnits() {
    return this.product.units > 0 && !this.hasPortions;
  }

  get unitText() {
    if (!this.hasUnits) return '';
    return `${this.product.units} unidades`;
  }

  get addons() {
    return this.product.addons ? this.product.addons.split(',').map(addon => addon.trim()) : [];
  }

  get flavors() {
    return this.product.flavors ? this.product.flavors.split(',').map(flavor => flavor.trim()) : [];
  }

  close() {
    this.dialogRef.close()
  }

  addToCart() {
    this.cartService.addProductToCart(this.product)
    this.notificationService.show("Producto añadido al carrito");
    this.close()
  }
}
