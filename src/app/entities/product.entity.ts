import {BaseEntity} from './base.entity';
import {CategoryEntity} from '@entities/category.entity';
import {ImageEntity} from '@entities/image.entity';
import {assetImageUrl} from '@app/utils/asset-image-url.util';

export class ProductEntity extends BaseEntity {
  name!: string;
  basePrice!: string;
  active!: boolean;
  isComplement: boolean = false;
  isOutstanding: boolean = false;
  units: number = 0;
  minPortions: number = 0;
  maxPortions: number = 0;

  images: ImageEntity[] = []

  // CATEGORIES
  categories: CategoryEntity[] = []
  categoriesIds: string[] = []

  addons: string = '';
  flavors: string = '';
  design: string = '';
}
