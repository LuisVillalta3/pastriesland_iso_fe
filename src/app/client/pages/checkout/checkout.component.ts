import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {CartItemComponent} from '@client/components/cart-item/cart-item.component';
import {ProductCartItem, ProductEntity} from '@entities/product.entity';
import {Subscription} from 'rxjs';
import {CartService} from '@client/services/cart.service';
import {NotificationService} from '@services/notification.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddressFormModalComponent} from '@client/components/address-form-modal/address-form-modal.component';
import { AddrressService } from '../../services/addrress.service';
import { AddressEntity } from '@/app/entities/address.entity';
import { AddressListItemComponent } from '../../components/address-list-item/address-list-item.component';
import { CookiesService } from '@/app/services/cookies.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [MatSlideToggleModule, MatIconModule, ReactiveFormsModule,
    MatFormFieldModule, MatInput, NgIf, NgxMaskDirective, CartItemComponent, CurrencyPipe, NgForOf, AddressListItemComponent],
  templateUrl: './checkout.component.html',
  providers: [provideNgxMask(), CurrencyPipe],
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  pickUp = false;
  paymentMethod: 'card' | 'cash' = 'card';

  productCartItems: ProductCartItem[] = [];

  addresses: AddressEntity[] = [];

  currentCart: ProductEntity[] = [];

  sub!: Subscription

  selectedAddressId: string | null = null;

  constructor(
    private cartService: CartService,
    private addressService: AddrressService,
    private notification: NotificationService,
    private orderService: OrdersService,
    private currencyPipe: CurrencyPipe,
    private cookieService: CookiesService,
    private router: Router,
    private dialog: MatDialog,
  ) {}


  togglePickUp() {
    this.pickUp = !this.pickUp;
  }

  get isPaymentCard() {
    return this.paymentMethod === 'card';
  }

  get isPaymentCash() {
    return this.paymentMethod === 'cash';
  }

  setPaymentMethod(method: 'card' | 'cash') {
    this.paymentMethod = method;
  }

  async ngOnInit(){
    if (!this.cookieService.getUserID()) {
      await this.router.navigate(['/']);
    }

    this.sub = this.cartService.cartProducts$.subscribe(
      async (products) => {
        this.currentCart = products

        this.productCartItems = this.cartService.generateProductCartItems(products);

        if (!products.length) {
          this.notification.show("No hay productos en el carrito", 'info')
          await this.router.navigate(['/']);
        }
      }
    )

    this.getAddresses()
  }

  getAddresses() {
    this.addressService.getAddresses().subscribe({
      next: (res) => {
        if (!res?.data) return;
        this.addresses = [...res.data];
        if (this.addresses.length && !this.selectedAddressId) {
          this.selectAddress(this.addresses[0].id);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  removeProduct(productId: string) {
    this.cartService.removeProductFromCart(productId);
  }

  get totalPrice() {
    return this.cartService.getCartPrice();
  }

  get countProducts() {
    return this.currentCart.length
  }

  get deliveryPrice() {
    return this.pickUp ? 0 : 4.99;
  }

  get totalOrderPrice() {
    return this.totalPrice + this.deliveryPrice;
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

  removeOneProduct(productId: string) {
    this.cartService.removeOneProductFromCart(productId);
  }

  addOneMore(product: ProductEntity) {
    this.cartService.addProductToCart(product);
  }

  selectAddress(addressId: string) {
    this.selectedAddressId = addressId;
  }

  get selectedAddress(): string {
    if (this.pickUp) return 'Recoger en tienda';
    return this.addresses.find(addr => addr.id === this.selectedAddressId)?.address || '';
  }

  confirmOrder() {
    this.orderService.createOrder({
      total: this.currencyPipe.transform(this.totalOrderPrice, 'USD', 'symbol', '1.2-2')!,
      items: this.currentCart,
      address: this.selectedAddress,
      paymentMethod: this.paymentMethod
    })?.subscribe({
      next: async () => {
        this.notification.show('Orden creada con éxito', 'success');
        this.cartService.clearCart();
        await this.router.navigate(['/']);
      }
    })
  }
}
