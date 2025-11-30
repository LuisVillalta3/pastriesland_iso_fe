import {BreadcrumbItem} from '@admin/components/breadcrumb/breadcrumb.component';

export const categoryTitle = 'Categorías'

export const defaultBcList: BreadcrumbItem[] = [
  { title: categoryTitle, route: 'categories' },
]

export const createBcList: BreadcrumbItem[] = [
  ...defaultBcList,
  { title: 'Crear categoría', route: '' },
]

export const editBcList = (categoryName: string): BreadcrumbItem[] =>
  [
    ...defaultBcList,
    {title: categoryName, route: '' },
    {title: 'Editar categoría', route: ''},
  ]
