import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from './configurations';

@Module({
   imports : [
      ConfigModule.forRoot({
         load: [configurations],
         envFilePath: '.env',
         isGlobal: true // means it's a global module
      })
   ]
})
export class DbConfigModule {}
