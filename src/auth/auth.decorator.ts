import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
//setMetada create a decorator with a json say that name: isPublic, value:true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Protected = () => SetMetadata(IS_PUBLIC_KEY, false);