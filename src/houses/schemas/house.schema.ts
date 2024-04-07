import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { STATUS, HOME_TYPE } from 'src/home.types';

@Schema({
  timestamps: true,
})

export class Home {

  @Prop({ auto: true })
  id: string;

  @Prop({ required: true })
  status: STATUS;

  @Prop({ required: true })
  type: HOME_TYPE;

  @Prop({ required: true })
  roomsCount: string;

  @Prop({ required: true })
  meterage: string;
  
  @Prop({ required: true })
  price: string;
  
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  warehouse: boolean;

  @Prop({ required: true })
  yard: boolean;

  @Prop({ required: true })
  parking: boolean;

  @Prop({ required: true })
  description: string;

}

export const HomeSchema = SchemaFactory.createForClass(Home)