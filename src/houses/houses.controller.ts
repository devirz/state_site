import { Controller, Get } from '@nestjs/common';
import { Home } from './schemas/house.schema';
import { HousesService } from './houses.service';

@Controller('houses')
export class HousesController {

  constructor(private houseService: HousesService) {}

  @Get()
  async index(): Promise<Home[]> {
    return this.houseService.findAll()
  }
}
 