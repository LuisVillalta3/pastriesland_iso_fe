import {Component, OnInit} from '@angular/core';
import {PageContextService} from '@admin/services/page-context.service';
import {ContactsService} from '@admin/modules/contacts/contacts.service';
import {NotificationService} from '@services/notification.service';
import type {GridApi, GridOptions, GridReadyEvent} from 'ag-grid-community';
import {createGridOptions} from '@admin/util/create-grid-options.util';
import {CONTACT_COLUMN_DEFS, CONTACT_TITLE, defaultBcList} from '@admin/modules/contacts/pages/list/constants';
import {TableComponent} from '@admin/components/table/table.component';

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
    private readonly contactsService: ContactsService,
    private notification: NotificationService,
  ) {}

  gridOptions: GridOptions<any> = {}

  gridApi!: GridApi

  loading: boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.pageContext.setTitle(CONTACT_TITLE)
      this.pageContext.setBreadcrumbs(defaultBcList)
      this.pageContext.setCreationLink('')
    });
    //
    this.gridOptions = createGridOptions<any>({
      columnDefs: CONTACT_COLUMN_DEFS,
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

    this.contactsService.getAll().subscribe({
      next: (res) => {
        this.gridApi?.setGridOption("rowData", res.data!.results)
      },
    })

    this.loading = false
  }
}
