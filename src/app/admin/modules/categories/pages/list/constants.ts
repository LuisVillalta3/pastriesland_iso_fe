import type {ColDef} from 'ag-grid-community';
import {TableActionCellComponent} from '@admin/components/table-action-cell/table-action-cell.component';
import {CategoryEntity} from '@entities/category.entity';
import {dateFormatter} from '@admin/util/date-formatter.util';

export type CategoryWithActions = CategoryEntity & { withActions?: boolean };

export const CATEGORY_COLUMN_DEFS: ColDef<CategoryWithActions>[] = [
  { field: "id" },
  {
    field: "name",
    headerName: "Nombre",
  },
  {
    field: "isActive",
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
