import {Component, OnInit} from '@angular/core';
import {ContactFormComponent} from '@client/components/contact-form/contact-form.component';
import {ProductCardComponent} from '@client/components/product-card/product-card.component';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ProductEntity} from '@entities/product.entity';
import {ProductLocaleService} from '@client/services/product.service';

@Component({
  selector: 'app-home',
  imports: [ContactFormComponent, ProductCardComponent, NgForOf, RouterLink, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductLocaleService) { }

  products: ProductEntity[] = []

  ngOnInit(): void {
    this.products = this.productService.getProducts()
  }
}
