import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/controller/users.controller';
import { UsersModule } from './users/users.module';
import {ConfigService, ConfigModule} from '@nestjs/config';
import {TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigModule } from './config/config.module';

@Module(
  {
    imports: [UsersModule, 
              TypeOrmModule.forRootAsync({
                //forRootAsync is usefull to make module options asynchrone and to write data ine the .env
                //configModule helps to charge ans to import all the variable from .env
                imports: [DbConfigModule],
                //useFactory make function to config TypeORM when NestJS need it, despistes on object with forRoot
                useFactory: (configService: ConfigService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: +configService.get('database.port'),
                    //+ useful to make port in number like (Number)(configService.get('port'))
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    entities: [],
                    synchronize: false,    
                  }),

              inject: [ConfigService],
              })
            ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})


export class AppModule {}
