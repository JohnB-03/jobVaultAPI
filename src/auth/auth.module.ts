import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants'
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports:[UsersModule, 
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
  ], 
  controllers: [AuthController], 
  providers: [AuthService, 
    {
      // provide provide the token to use in the global statement 
      provide: APP_GUARD, 
      // useClass is the guard use to all the requests
      useClass : AuthGuard
    }

  ]
})
export class AuthModule {
}
