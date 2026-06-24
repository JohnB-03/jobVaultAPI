import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/controller/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, 
    //for root is useful for static value bcs it's done directly when compiled
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port: 5432,
      //need to put that in the .env
      username: "xx",
      password: "xxx",
      database: "jobVaultDB",
      entities: [],
      synchronize: true, // in production i need to put false
      // synchronize helps to automaticely change the DB if the entities changes

    })
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
