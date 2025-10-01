import {environment} from '@/environments/environment';

export const getImageUrl = (url: string) => `${environment.assetsUrl}/${url}`
