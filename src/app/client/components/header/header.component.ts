import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showNav = false
  isAtTop = window.scrollY === 0;

  isLoggedIn = false

  constructor(
    private route: ActivatedRoute,
  ) {}

  toggleShowNav() {
    this.showNav = !this.showNav;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isAtTop = window.scrollY === 0;
  }

  get productsCount() {
    return 5
  }
}
