import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-table-action-cell',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './table-action-cell.component.html',
  styleUrl: './table-action-cell.component.scss'
})
export class TableActionCellComponent implements ICellRendererAngularComp {
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  private params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

  onDelete() {
    this.params.context.componentParent.onDelete(this.params.data);
  }

  onEdit() {
    this.params.context.componentParent.onEdit(this.params.data);
  }
}
