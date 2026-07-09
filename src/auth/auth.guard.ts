import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    // this isPublic use reflector who will check if the handler posses the key IS_Public 
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(isPublic) return true;
    // i extrat the req from the url
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // here i'll just verify if token exist
    if(!token) {
      throw new UnauthorizedException();
    }
    try {
      // here i'll verify the playload of the token
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      // if trycatch catch an error while verify the token
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
