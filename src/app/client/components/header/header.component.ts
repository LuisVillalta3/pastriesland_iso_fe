import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginModalComponent} from '@client/components/login-modal/login-modal.component';
import {CookiesService} from '@services/cookies.service';
import {Subscription} from 'rxjs';
import {CartService} from '@client/services/cart.service';
import {ProductEntity} from '@entities/product.entity';
import {NgIf} from '@angular/common';
import {NotificationService} from '@services/notification.service';
import {CartModalComponent} from '@client/components/cart-modal/cart-modal.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  showNav = false
  isAtTop = window.scrollY === 0;

  isLoggedIn = false;

  private sub!: Subscription;
  private cartSub!: Subscription

  currentCart: ProductEntity[] = [];

  constructor(
    private dialog: MatDialog,
    private cookieService: CookiesService,
    private cartService: CartService,
    private notification: NotificationService,
    private route: ActivatedRoute,
  ) {}

  toggleShowNav() {
    this.showNav = !this.showNav;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isAtTop = window.scrollY === 0;
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      minWidth: '250px',
      maxWidth: '1024px',
      width: 'calc(100% - 2rem)',
    })

    dialogRef.afterClosed().subscribe()
  }

  ngOnInit(): void {
    this.sub = this.cookieService.clientToken$.subscribe(
      token => this.isLoggedIn = !!token
    )

    this.route.queryParams.subscribe(params => {
      if (params['login'] && params['login'] === 'true' && !this.isLoggedIn) {
        this.openLoginModal();
      }
    })

    this.cartSub = this.cartService.cartProducts$.subscribe(
      products => this.currentCart = products
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.cartSub.unsubscribe()
  }

  buttonAction() {
    if (!this.isLoggedIn) {
      this.openLoginModal()
      return
    }

    //this.cookieService.deleteToken('client')
  }

  get productsCount() {
    return this.currentCart.length
  }

  showCart() {
    if (!this.productsCount) {
      this.notification.show("No tienes productos en el carrito", 'info')
      return
    }

    const dialogRef = this.dialog.open(CartModalComponent, {
      minWidth: '250px',
      maxWidth: '1024px',
      width: 'calc(100% - 2rem)',
    })

    dialogRef.afterClosed().subscribe()
  }
}
