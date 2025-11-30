import { OrderEntity } from '@/app/entities/order.entity';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotificationService } from '@/app/services/notification.service';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, CurrencyPipe, CartItemComponent, NgForOf, NgIf],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  order: OrderEntity | null = null;
  orderId: string | null = null;

  constructor(
    private orderService: OrdersService,
    private activedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe({
      next: (params) => {
        this.orderId = params.get('id');
        console.log('Order ID:', this.orderId);

        this.orderService.getOrderById(this.orderId || '').subscribe({
          next: async (res: any) => {
            if (!res?.data) {
              await this.router.navigate(['/']);
              this.notificationService.show('No se encontró esa orden', 'error');
              return;
            }

            this.order = res.data;
          },
          error: async () => {
            await this.router.navigate(['/']);
            this.notificationService.show('No se encontró esa orden', 'error');
          }
        })
      }
    })
  }

  get paymentMethodText() {
    return this.order?.paymentMethod === 'card' ? 'Tarjeta de crédito' : 'Efectivo';
  }

  get productItems() {
    return this.cartService.generateOrderItems(this.order?.items || []);
  }
}
