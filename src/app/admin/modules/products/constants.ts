import {BreadcrumbItem} from '@/app/admin/components/breadcrumb/breadcrumb.component';

export const productTitle = 'Productos'

export const defaultBcList: BreadcrumbItem[] = [
  { title: productTitle, route: 'products' },
]

export const createBcList: BreadcrumbItem[] = [
  ...defaultBcList,
  { title: 'Crear Producto', route: '' },
]

export const editBcList = (categoryName: string): BreadcrumbItem[] =>
  [
    ...defaultBcList,
    {title: categoryName, route: '' },
    {title: 'Editar Producto', route: ''},
  ]
