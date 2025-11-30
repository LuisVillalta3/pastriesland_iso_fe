import {Component, Input, OnInit} from '@angular/core';
import {ProductEntity} from '@entities/product.entity';
import {assetImageUrl} from '@app/utils/asset-image-url.util';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CurrencyPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ProductModalComponent} from '@client/components/product-modal/product-modal.component';

@Component({
  selector: 'app-product-card',
  imports: [MatIconModule, MatTooltipModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: ProductEntity;

  constructor(private dialog: MatDialog) {}

  get mainImage() {
    return assetImageUrl(this.product.images[0]?.path || '');
  }

  openModal() {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { product: this.product },
      minWidth: '250px',
      maxWidth: '1024px',
      width: 'calc(100% - 2rem)',
    })

    dialogRef.afterClosed().subscribe()
  }
}
