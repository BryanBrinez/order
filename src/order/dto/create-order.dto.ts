import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsString()
  product: string;

  @IsNumber()
  quantity: number;
}
