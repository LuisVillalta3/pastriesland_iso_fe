import {environment} from '@/environments/environment';

export const assetImageUrl = (imagePath: string): string => {
  if (!imagePath) return 'assets/img/cake1.jpg';
  return `${environment.assetsUrl}/${imagePath}`;
}
