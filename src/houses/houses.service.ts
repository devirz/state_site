import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Home } from 'src/houses/schemas/house.schema';

@Injectable()
export class HousesService {

  constructor(
    @InjectModel(Home.name)
    private houseModel: mongoose.Model<Home>
  ) {}

  async findAll(): Promise<Home[]> {
    const results = await this.houseModel.find()
    return results
  }

  async findOne({id}): Promise<Home> {
    if(!id) throw new BadRequestException("parameter \'id\ is required")
    const result = await this.houseModel.findById(id)
    return result
  }

  async addHouse(house: Home): Promise<Home> {
    try {
      const result = await this.houseModel.create(house)
      return result
    } catch(e){
      throw new BadRequestException(e.message)
    }
  }

  async delete(id) {
    try {
      const result = await this.houseModel.deleteOne({_id: id})
      return result
    } catch (e){
      throw new BadRequestException(e.message)
    }
  }

}
