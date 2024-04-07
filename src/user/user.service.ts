import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from "mongoose"

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find()
    return users
  }

  async findOne({id}): Promise<User> {
    if(!id) throw new BadRequestException("parameter \'id\ is required")
    const result = await this.userModel.findById(id)
    return result
  }

  async create(user: User): Promise<User> {
    try {
      const result = await this.userModel.create(user)
      return result
    } catch(error){
      if(error.code === 11000){
        throw new BadRequestException("User Exists!")
      }
    }
  }

  async delete(id) {
    try {
      const result = await this.userModel.deleteOne({_id: id})
      return result
    } catch (e){
      throw new BadRequestException(e.message)
    }
  }

}
