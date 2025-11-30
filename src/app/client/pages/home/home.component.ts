import {Component, OnInit} from '@angular/core';
import {ContactFormComponent} from '@client/components/contact-form/contact-form.component';
import {ProductCardComponent} from '@client/components/product-card/product-card.component';
import {ProductService} from '@client/services/product.service';
import {ProductEntity} from '@entities/product.entity';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ContactFormComponent, ProductCardComponent, NgForOf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) { }

  products: ProductEntity[] = []

  ngOnInit(): void {
    this.productService.getProducts({ onlyOutstandings: true }).subscribe({
      next: (res) => {
        this.products = res.data || []
      }
    })
  }
}
