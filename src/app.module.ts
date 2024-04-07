import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { HousesController } from './houses/houses.controller';
import { HousesService } from './houses/houses.service';
import { HousesModule } from './houses/houses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    HousesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}