import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { HOME_TYPE, STATUS } from "./home.types";
import { IsPrice } from "./validators/price.validator";

export class HomeEntity {

  @IsNotEmpty()
  @ApiProperty({ example: "buy", description: "status for house: buy | rent" })
  status: STATUS;

  @IsNotEmpty()
  @ApiProperty({ example: "villa", description: "type of house: apartment | villa"})
  type: HOME_TYPE;

  @IsNotEmpty()
  @ApiProperty({ example: "3", description: "rooms count" })
  roomsCount: string;

  @IsNotEmpty()
  @ApiProperty({ example: "180", description: "meterage of house based on meter"})
  meterage: string;

  @IsNotEmpty()
  @IsPrice()
  @ApiProperty({ example: "250000", description: "price of the house" })
  price: string;

  @IsNotEmpty()
  @ApiProperty({ example: "new york", description: "location of the house" })
  city: string;

  @IsNotEmpty()
  @ApiProperty({ example: "true", description: "house have a warehouse or not? true | false" })
  warehouse: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: "false", description: "house have yard or not? true | false" })
  yard: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: "false", description: "house have parking or not? true | false" })
  parking: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: "dream house on the beach with sea view", description: "description of house" })
  description: string;

}