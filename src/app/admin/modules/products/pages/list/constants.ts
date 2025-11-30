import {ProductEntity} from '@entities/product.entity';
import type {ColDef} from 'ag-grid-community';
import {dateFormatter} from '@admin/util/date-formatter.util';
import {TableActionCellComponent} from '@admin/components/table-action-cell/table-action-cell.component';

export type ProductWithActions = ProductEntity & { withActions?: boolean };

export const PRODUCT_COLUMN_DEFS: ColDef<ProductWithActions>[] = [
  { field: "id" },
  {
    field: "name",
    headerName: "Nombre",
  },
  {
    field: "active",
    headerName: "Activo"
  },
  {
    field: "createdAt",
    headerName: "Fecha de creación",
    valueFormatter: (params) => dateFormatter(params.value)
  },
  {
    field: "updatedAt",
    headerName: "Fecha de actualización",
    valueFormatter: (params) => dateFormatter(params.value)
  },
  {
    field: "withActions",
    headerName: "Acciones",
    cellRenderer: TableActionCellComponent,
    sortable: false
  },
]
