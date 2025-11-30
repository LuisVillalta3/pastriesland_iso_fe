import {AfterViewInit, Component, Input} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-admin-table',
  imports: [AgGridAngular],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input({ required: true }) gridOptions!: GridOptions<any>;
}
