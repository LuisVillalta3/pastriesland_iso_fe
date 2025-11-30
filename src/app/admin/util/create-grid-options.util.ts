import type {GridOptions, ColDef, ColGroupDef} from 'ag-grid-community';

export function createGridOptions<T>(
  gridOptions: Partial<GridOptions<T>>,
  componentParent: any
): GridOptions<T> {
  return {
    rowData: [],
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      resizable: true
    },
    localeText: {
      noRowsToShow: 'No hay data disponible'
    },
    context: {
      componentParent,
    },
    ...gridOptions,
  }
}
