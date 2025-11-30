import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddressFormModalComponent } from '../address-form-modal/address-form-modal.component';
import { NgForOf } from '@angular/common';
import { AddrressService } from '../../services/addrress.service';
import { AddressEntity } from '@/app/entities/address.entity';
import { AddressListItemComponent } from '../address-list-item/address-list-item.component';
import { CookiesService } from '@/app/services/cookies.service';
import { Router } from '@angular/router';
import { OrderListItemComponent } from '../order-list-item/order-list-item.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-my-account-modal',
  imports: [MatIconModule, NgForOf, AddressListItemComponent, OrderListItemComponent],
  templateUrl: './my-account-modal.component.html',
  styleUrl: './my-account-modal.component.scss'
})
export class MyAccountModalComponent implements OnInit {
  addresses: AddressEntity[] = [];
  orders: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<MyAccountModalComponent>,
    private dialog: MatDialog,
    private router: Router,
    private cookieService: CookiesService,
    private addressService: AddrressService,
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.getAddresses()
    this.getOrders()
  }

  getOrders() {
    this.ordersService.getUserOrders().subscribe({
      next: (res: any) => {
        if (!res?.data) return;
        this.orders = [...res.data];
      }
    })
  }

  close() {
    this.dialogRef.close()
  }

  createAddress() {
    const dialogRef = this.dialog.open(AddressFormModalComponent, {
      minWidth: '250px',
      maxWidth: '750px',
      width: 'calc(100% - 2rem)',
    })

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getAddresses()
      }
    })
  }

  getAddresses() {
    this.addressService.getAddresses().subscribe({
      next: (res) => {
        if (!res?.data) return;
        this.addresses = [...res.data];
      }
    })
  }

  async logout() {
    this.cookieService.deleteToken('client')
    await this.router.navigate(['/']);
    this.close()
  }

  async viewOrder(orderID: string) {
    await this.router.navigate([`/orders/${orderID}`]);
    this.close()
  }
}
