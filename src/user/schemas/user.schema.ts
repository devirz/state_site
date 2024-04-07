import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
})

export class User {

  @Prop({ auto: true })
  @ApiProperty({
    required: true,
  })
  id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: [] })
  images: Array<string>;

}

export const UserSchema = SchemaFactory.createForClass(User)