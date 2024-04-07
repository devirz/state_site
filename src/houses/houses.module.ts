import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeSchema } from 'src/houses/schemas/house.schema';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Home", schema: HomeSchema}])],
  providers: [HousesService],
  controllers: [HousesController]
})
export class HousesModule {}
