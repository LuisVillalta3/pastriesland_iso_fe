import {Component, OnInit} from '@angular/core';
import {PageContextService} from '@admin/services/page-context.service';
import {NotificationService} from '@services/notification.service';
import {Router} from '@angular/router';
import {productTitle, defaultBcList} from '@admin/modules/products/constants';
import {TableComponent} from '@admin/components/table/table.component';
import {MatDialog} from '@angular/material/dialog';
import type {GridApi, GridOptions, GridReadyEvent} from 'ag-grid-community';
import {createGridOptions} from '@admin/util/create-grid-options.util';
import {PRODUCT_COLUMN_DEFS} from '@admin/modules/products/pages/list/constants';
import {ProductsService} from '@admin/modules/products/products.service';

@Component({
  selector: 'app-list',
  imports: [
    TableComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(
    private pageContext: PageContextService,
    private notification: NotificationService,
    private router: Router,
    private dialog: MatDialog,
    private productService: ProductsService,
  ) {}

  gridOptions: GridOptions<any> = {}

  gridApi!: GridApi

  loading: boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.pageContext.setTitle(productTitle)
      this.pageContext.setBreadcrumbs(defaultBcList)
      this.pageContext.setCreationLink('products/create')
    });

    this.gridOptions = createGridOptions<any>({
      columnDefs: PRODUCT_COLUMN_DEFS,
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

    this.productService.getAll().subscribe({
      next: (res) => {
        this.gridApi?.setGridOption("rowData", res.data!.results)
      },
    })

    this.loading = false
  }


  async onEdit(rowData: any) {
    await this.router.navigate([`admin/products/${rowData.id}/edit`])
  }
}
