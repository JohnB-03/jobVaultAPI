import { SetMetadata } from '@nestjs/common';


export const IS_ADMIN_KEY = 'isAdmin';
export const onlyAdmin = () => SetMetadata(IS_ADMIN_KEY, true);