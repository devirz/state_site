import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class UserEntity {

  @IsNotEmpty()
  @ApiProperty({ example: "Alireza", description: 'The username of user' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@test.com', description: 'The email of user' })
  email: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '09213332222', description: 'The phone number of user' })
  phone: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({ example: 'alireza1234', description: 'The password of user' })
  password: string;

}