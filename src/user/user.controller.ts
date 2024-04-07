import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UserEntity } from './user.entities';
import { isEmpty } from 'lodash';
import { md5 } from 'src/md5';

type IDTYPE = { id: string }


@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }
  // get all user for route /user
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Find User' })
  @ApiResponse({ status: 200, description: 'find user.' })
  @ApiResponse({ status: 404, description: 'if user does not exists.' })
  @ApiBody({
    required: true,
    description: "id of user",
    type: "string"
  })
  @UsePipes(ValidationPipe)
  @Post("find")
  async findOne(@Body() user): Promise<User> {
    try {
      const result = await this.userService.findOne(user)
      return result
    } catch(e){
      if(e.name === "CastError") throw new NotFoundException("User Does Not Exists!")
      throw new BadRequestException(e.message)
    }
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, description: 'delete user.' })
  @ApiResponse({ status: 400, description: 'if user does not exists.' })
  @UsePipes(ValidationPipe)
  @Post("delete")
  async delete(@Body() { id }){
    if(!id) throw new BadRequestException("parameter \'id\' is required")
    const result = await this.userService.delete(id)
    if(!result.deletedCount) throw new BadRequestException("User does not exists!")
    return { ok: true }
  }
  
  // register user for route /user/register
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: 'create user.', type: UserEntity })
  @UsePipes(ValidationPipe)
  @Post("register")
  async createUser(@Body() user): Promise<User> {
    if (isEmpty(user)) {
      throw new BadRequestException("Invalid User!")
    }
    const userPassword = md5(user.password)
    user.password = userPassword
    return this.userService.create(user)

  }
}
