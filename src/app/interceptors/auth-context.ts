import {HttpContextToken} from '@angular/common/http';

export const IS_ADMIN = new HttpContextToken<boolean>(() => false)
export const IS_Client = new HttpContextToken<boolean>(() => false)
