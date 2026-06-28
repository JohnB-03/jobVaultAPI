import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions =  {
      type:"postgres",
      host:"localhost",
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: "jobVaultDB",
      entities: [],
      synchronize: false, // in production i need to put false
      // synchronize helps to automaticely change the DB if the entities changes
}
   
