import {Component, inject, OnInit} from '@angular/core';
import type {GridApi, GridOptions, GridReadyEvent} from 'ag-grid-community';
import {TableComponent} from '@admin/components/table/table.component';
import {PageContextService} from '@admin/services/page-context.service';
import {createGridOptions} from '@admin/util/create-grid-options.util';
import {CATEGORY_COLUMN_DEFS } from '@admin/modules/categories/pages/list/constants';
import {CategoryService} from '@admin/modules/categories/category.service';
import {NotificationService} from '@services/notification.service';
import {categoryTitle, defaultBcList} from '@admin/modules/categories/constants';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DeleteDialogComponent} from '@admin/components/confirm-dialog/delete-dialog.component';


@Component({
  selector: 'app-list',
  imports: [TableComponent, MatDialogModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(
    private pageContext: PageContextService,
    private readonly categoryService: CategoryService,
    private notification: NotificationService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  gridOptions: GridOptions<any> = {}

  gridApi!: GridApi

  loading: boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.pageContext.setTitle(categoryTitle)
      this.pageContext.setBreadcrumbs(defaultBcList)
      this.pageContext.setCreationLink('categories/create')
    });
    //
    this.gridOptions = createGridOptions<any>({
      columnDefs: CATEGORY_COLUMN_DEFS,
      onGridReady: this.onGridReady.bind(this),
      loading: this.loading,
    }, this)
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.loadData()
  }

  loadData() {
    this.loading = true;

    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.gridApi?.setGridOption("rowData", res.data!.results)
      },
    })

    this.loading = false
  }

  onDelete(rowData: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: '¿Desea borrar esta categoría?',
        message: `Si borra la categoría ${rowData.name} no se podra recuperar`,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteCategory(rowData.id)
    })
  }

  async onEdit(rowData: any) {
    await this.router.navigate([`admin/categories/${rowData.id}/edit`])
  }

  deleteCategory(id: string) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.loadData()
        this.notification.show("Category borrada correctamente")
      }
    })
  }
}
