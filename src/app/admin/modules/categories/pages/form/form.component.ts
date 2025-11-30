import {Component, OnInit} from '@angular/core';
import {PageContextService} from '@admin/services/page-context.service';
import {categoryTitle, createBcList, editBcList} from '@admin/modules/categories/constants';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {CategoryService} from '@admin/modules/categories/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryEntity} from '@entities/category.entity';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NotificationService} from '@services/notification.service';

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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  id!: string | null;

  loading = false

  form: FormGroup;

  category?: CategoryEntity

  constructor(
    private pageContext: PageContextService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
    })

    this.fetchCategory()

    setTimeout(() => {
      this.pageContext.setTitle(categoryTitle)
      this.pageContext.setBreadcrumbs(createBcList);
      this.pageContext.setCreationLink('')
    });
  }

  fetchCategory() {
    if (!this.id) return

    this.loading = true;

    this.categoryService.getById(this.id).subscribe({
      next: (res) => {
        this.category = res.data

        this.pageContext.setBreadcrumbs(editBcList(res.data?.name || ''));

        this.form.patchValue({
          name: res.data?.name,
          isActive: res.data?.isActive
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

  onSubmit() {
    if (!this.form.valid) return;

    const { name, isActive } = this.form.value;

    if (this.id) this.update(name, isActive)
    else this.create(name, isActive)
  }

  create(name: string, isActive: boolean) {
    this.categoryService.create(name, isActive).subscribe({
      next: async (res) => {
        this.notification.show(`Categoría ${name} creada exitosamente`)
        await this.router.navigate(['admin/categories'])
      }
    })
  }

  update(name: string, isActive: boolean) {
    this.categoryService.update(this.id!, name, isActive).subscribe({
      next: async (res) => {
        this.notification.show(`Categoría ${name} actualizada exitosamente`)
        this.pageContext.setBreadcrumbs(editBcList(name));
      }
    })
  }
}
