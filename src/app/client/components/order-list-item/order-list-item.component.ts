import { OrderEntity } from '@/app/entities/order.entity';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-list-item',
  imports: [DatePipe, CurrencyPipe, MatIconModule],
  templateUrl: './order-list-item.component.html',
  styleUrl: './order-list-item.component.scss'
})
export class OrderListItemComponent {
  @Input({ required: true }) order!: OrderEntity

  @Output() viewedOrder = new EventEmitter<string>();

  viewOrder() {
    this.viewedOrder.emit(this.order.id);
  }
}
