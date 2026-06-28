import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/controller/users.controller';
import { UsersModule } from './users/users.module';
import {ConfigService, ConfigModule} from '@nestjs/config';
import {TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigModule } from './config/config.module';

@Module(
  {
    imports: [UsersModule, 
              TypeOrmModule.forRootAsync({
                //forRootAsync is usefull to make module options asynchrone and to write data ine the .env
                //configModule helps to charge ans to import all the variable from .env
                imports: [MyConfigModule],
                //useFactory make function to config TypeORM when NestJS need it, despistes on object with forRoot
                useFactory: (configService: ConfigService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: +configService.get('DATABASE_PORT'),
                    //+ useful to make port in number like (Number)(configService.get('port'))
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [],
                    synchronize: false,
                  }),

              inject: [ConfigService],
              }), MyConfigModule
            ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})


export class AppModule {}
