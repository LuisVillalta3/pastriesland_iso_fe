import {BaseEntity} from '@/app/entities/base.entity';

export class CategoryEntity extends BaseEntity{
  name!: string

  isActive!: boolean;
}
