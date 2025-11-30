import {BaseEntity} from '@/app/entities/base.entity';
import { ProductEntity } from './product.entity';

export class OrderEntity extends BaseEntity{
  name!: string

  address!: string;

  items: ProductEntity[] = []

  paymentMethod!: string;

  status!: string;

  total!: number
}
