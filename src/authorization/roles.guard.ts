import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from './roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    // my role guard needs to cancel the rights to go next if the roles doesn't match
      canActivate(context: ExecutionContext): boolean {
         const adminOnly = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
            context.getHandler(), 
            context.getClass()
         ]);

         if(!adminOnly) return true;
         
         // now here is a admin so i need to check if he is admin or not
         const {user} = context.switchToHttp().getRequest();
         if(!user.isAdmin) throw new ForbiddenException();

         return true;
      
    }

}