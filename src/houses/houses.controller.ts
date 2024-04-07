import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { isEmpty } from 'lodash';
import { Home } from './schemas/house.schema';
import { HousesService } from './houses.service';
import { HomeEntity } from 'src/home.entitiy';

@ApiBearerAuth()
@ApiTags('houses')
@Controller('houses')
export class HousesController {

  constructor(private houseService: HousesService) {}

  @Get()
  async index(): Promise<Home[]> {
    return this.houseService.findAll()
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Find House' })
  @ApiResponse({ status: 200, description: 'find house.' })
  @ApiResponse({ status: 404, description: 'if house does not exists.' })
  @UsePipes(ValidationPipe)
  @Post("find")
  async findOne(@Body() house): Promise<Home> {
    try {
      const result = await this.houseService.findOne(house)
      return result
    } catch(e){
      if(e.name === "CastError") throw new NotFoundException("House Does Not Exists!")
      throw new BadRequestException(e.message)
    }
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Delete House' })
  @ApiResponse({ status: 200, description: 'delete house.' })
  @ApiResponse({ status: 400, description: 'if house does not exists.' })
  @UsePipes(ValidationPipe)
  @Post("delete")
  async delete(@Body() { id }){
    if(!id) throw new BadRequestException("parameter \'id\' is required")
    const result = await this.houseService.delete(id)
    if(!result.deletedCount) throw new BadRequestException("House does not exists!")
    return { ok: true }
  }

  @ApiOperation({ summary: 'Create House' })
  @ApiResponse({ status: 200, description: 'create house.', type: HomeEntity })
  @UsePipes(ValidationPipe)
  @Post("add")
  async createUser(@Body() house): Promise<Home> {
    if (isEmpty(house)) {
      throw new BadRequestException("Invalid House!")
    }
    return this.houseService.addHouse(house)
  }
}