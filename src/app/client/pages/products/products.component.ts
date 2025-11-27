import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProductCardComponent} from "@client/components/product-card/product-card.component";
import {ContactFormComponent} from '@client/components/contact-form/contact-form.component';
import {ProductService} from '@client/services/product.service';
import {ProductEntity} from '@entities/product.entity';
import {CategoryEntity} from '@entities/category.entity';
import {CategoriesService} from '@client/services/categories.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {PaginationMeta} from '@app/types/paginated.response';
import {PaginationComponent} from '@client/components/pagination/pagination.component';
import {ActivatedRoute, Router} from '@angular/router';

const DEFAULT_PAGINATION_META: PaginationMeta = {
  page: 1,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 6,
  nextPage: null,
  prevPage: null,
  total: 0,
  totalPages: 0
}

@Component({
  selector: 'app-products',
  imports: [
    NgForOf,
    ProductCardComponent,
    ContactFormComponent,
    ProductCardComponent,
    FormsModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  seeFilters = false

  paginationMeta!: PaginationMeta

  selectedCategories: string[] = []

  toggleSeeFilters() {
    this.seeFilters = !this.seeFilters;
  }

  products: ProductEntity[] = []
  categories: CategoryEntity[] = []

  ngOnInit(): void {
    this.paginationMeta = DEFAULT_PAGINATION_META;

    this.route.queryParams.subscribe(params => {
      this.paginationMeta.page = +params['page'] || 1

      this.selectedCategories = params['categories']?.split('+') || []

      this.fetchProducts()
    })

    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.results || [];
      }
    })
  }

  fetchProducts() {
    this.productService.getProductsPaginated({ onlyOutstandings: false, paginated: true, page: this.paginationMeta.page, categories: this.selectedCategories }).subscribe({
      next: (res) => {
        this.products = res.data?.results || []

        this.paginationMeta = res.data?.paginationProps || DEFAULT_PAGINATION_META;
      }
    })
  }

  async changePage(page: number) {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    })
  }

  async toggleCategories(categoryId: string) {
    if (this.selectedCategories.includes(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
      return;
    }

    this.selectedCategories.push(categoryId);
    console.log(this.selectedCategories)


  }

  async applyFilters() {
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, categories: this.selectedCategories.join('+') },
      queryParamsHandling: 'merge'
    });
  }

  async clearFilters() {
    this.selectedCategories = [];
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, categories: null },
      queryParamsHandling: 'merge'
    });
  }
}
