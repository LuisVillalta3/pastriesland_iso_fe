import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PageContextService} from '@admin/services/page-context.service';
import {CategoryService} from '@admin/modules/categories/category.service';
import {NotificationService} from '@services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {productTitle, createBcList, editBcList} from '@admin/modules/products/constants';
import {UploadImageService} from '@admin/services/upload-image.service';
import {ProductsService} from '@admin/modules/products/products.service';
import {MatIconModule} from '@angular/material/icon';
import {ProductEntity} from '@entities/product.entity';
import {getImageUrl} from '@app/utils/get-image-url.util';
import {CategoryEntity} from '@entities/category.entity';
import {
  InputOption,
  MultiAutocompleteComponent
} from '@admin/components/multi-autocomplete/multi-autocomplete.component';

type UploadedImg = {
  id?: number;
  url: string;
}

@Component({
  selector: 'app-form',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
    NgForOf,
    MatIconModule,
    MultiAutocompleteComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  id!: string | null;

  imgInputId = Math.random()

  loading = false

  form: FormGroup;

  product?: ProductEntity

  selectedFiles: File | null = null;
  uploadedPreviews: UploadedImg[] = [];
  uploadedFiles: File[] = []
  deleteImages: number[] = []

  categories: InputOption[] = []

  selectedCategories: string[] = []

  constructor(
    private pageContext: PageContextService,
    private categoryService: CategoryService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private imageService: UploadImageService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      basePrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      active: [true],
      isOutstanding: [false],
      isComplement: [false],
      units: [0, Validators.required],
      minPortions: [0, Validators.required],
      maxPortions: [0, Validators.required],
      addons: [''],
      flavors: [''],
      design: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
    })

    this.fetchProduct()
    this.fetchCategories()

    setTimeout(() => {
      this.pageContext.setTitle(productTitle)
      this.pageContext.setBreadcrumbs(createBcList);
      this.pageContext.setCreationLink('')
    });
  }

  fetchCategories() {
    this.loading = true

    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data?.results?.map((r) => ({
          key: r.id,
          value: r.name
        })) || []
      }
    })

    this.loading = false;
  }

  fetchProduct() {
    if (!this.id) return

    this.loading = true;

    this.productsService.getById(this.id).subscribe({
      next: (res) => {
        this.product = res.data

        this.pageContext.setBreadcrumbs(editBcList(res.data?.name || ''));

        this.selectedCategories = res.data?.categories.map((r) => r.id) || [];

        res.data?.images?.forEach((img) => {
          this.uploadedPreviews.push({
            id: img?.id,
            url: getImageUrl(img?.path)
          })
        })

        this.form.patchValue({
          name: res.data?.name,
          basePrice: res.data?.basePrice,
          minPortions: res.data?.minPortions,
          maxPortions: res.data?.maxPortions,
          active: res.data?.active,
          units: res.data?.units,
          isOutstanding: res.data?.isOutstanding,
          addons: res.data?.addons,
          flavors: res.data?.flavors,
          design: res.data?.design,
        })
      }
    })

    this.loading = false
  }

  get nameErrors() {
    if (this.form.get('name')?.hasError('required'))
      return 'El nombre es requerido'

    return null;
  }

  get priceErrors() {
    if (this.form.get('basePrice')?.hasError('required'))
      return 'El precio es requerido'
    if (this.form.get('basePrice')?.hasError('pattern'))
      return 'Tiene que ser un precio valido'

    return null;
  }

  get unitsErrors() {
    if (this.form.get('units')?.hasError('required'))
      return 'Al menos tiene que haber 0 unidades'

    return null;
  }

  get minPortionsErrors() {
    if (this.form.get('minPortions')?.hasError('required'))
      return 'Al menos tiene que haber 0 porciones minimas'

    return null;
  }

  get maxPortionsErrors() {
    if (this.form.get('maxPortions')?.hasError('required'))
      return 'Al menos tiene que haber 0 porciones máxima'

    return null;
  }

  onSubmit() {
    if (!this.form.valid) return;

    const {
      name,
      active,
      isComplement,
      maxPortions,
      minPortions,
      basePrice,
      units,
      isOutstanding,
      addons,
      flavors,
      design
    } = this.form.value;

    if (this.id) {
      this.productsService.update(this.id, {
        name,
        active,
        categoriesIds: this.selectedCategories,
        isComplement,
        maxPortions,
        minPortions,
        isOutstanding,
        basePrice,
        units,
        addons,
        flavors,
        design
      }).subscribe({
        next: (res) => {
          this.pageContext.setBreadcrumbs(editBcList(name || ''));

          this.deleteImagesFn()
          this.saveImages(this.id!)

          this.notification.show('Producto actualizado exitosamente')
        }
      })
      return
    }

    this.productsService.create({
      name,
      active,
      categoriesIds: this.selectedCategories,
      isComplement,
      maxPortions,
      isOutstanding,
      minPortions,
      basePrice,
      units,
      addons,
      flavors,
      design
    }).subscribe({
      next: async (res) => {
        this.saveImages(res.data!.id!)

        this.notification.show('Producto creado exitosamente')
        await this.router.navigate(['admin/products'])
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.selectedFiles = null;
      return;
    }

    this.selectedFiles = input.files[0];
  }

  uploadFileToPreview() {
    if (!this.selectedFiles) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string;
      this.uploadedPreviews.push({
        url: result
      })
      this.uploadedFiles.push(this.selectedFiles!)
      this.imgInputId = Math.random()
      this.selectedFiles = null;
    }

    reader.readAsDataURL(this.selectedFiles)
  }

  deleteImagePreview(id: number) {
    this.deleteImages.push(id)
    this.uploadedPreviews = this.uploadedPreviews.filter((up) => up.id !== id)
  }

  deleteImagesFn() {
    if (!this.deleteImages.length) return

    this.deleteImages.forEach((img) => {
      this.imageService.delete(img).subscribe()
    })

    this.deleteImages = []
  }

  saveImages(id: string) {
    if (!this.uploadedFiles.length) return;

    this.uploadedFiles.forEach((f) => {
      const formData = new FormData();
      formData.append('imageableType', 'products')
      formData.append('imageableId', id)
      formData.append('file', f)

      this.imageService.create(formData).subscribe()
    })

    this.uploadedFiles = []
  }

  onSelectionChanged(keys: string[]) {
    this.selectedCategories = keys;
  }
}
