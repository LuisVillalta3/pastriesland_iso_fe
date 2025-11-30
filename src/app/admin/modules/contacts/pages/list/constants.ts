import type {ColDef} from 'ag-grid-community';
import {dateFormatter} from '@admin/util/date-formatter.util';
import {ContactEntity} from '@entities/contact.entity';
import {BreadcrumbItem} from '@admin/components/breadcrumb/breadcrumb.component';

export const CONTACT_TITLE = "Contactos";

export const defaultBcList: BreadcrumbItem[] = [
  { title: CONTACT_TITLE, route: 'contacts' },
]

export const CONTACT_COLUMN_DEFS: ColDef<ContactEntity>[] = [
  { field: "id" },
  {
    field: "name",
    headerName: "Nombre",
  },
  {
    field: "email",
    headerName: "Email"
  },
  {
    field: "whatsapp",
    headerName: "Whatsapp",
  },
  {
    field: "message",
    headerName: "Mensaje",
    valueFormatter: (params) => {
      if (!params.value) return "No hay mensaje";
      return params.value
    }
  },
  {
    field: "createdAt",
    headerName: "Fecha de contacto",
    valueFormatter: (params) => dateFormatter(params.value)
  },
]
