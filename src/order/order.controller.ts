import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const userId = request.user.id;

    return this.orderService.create(userId, createOrderDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() request: Request) {
    const userId = request.user.id;

    return this.orderService.findAllByUser(userId);
  }

  // Obtener un pedido específico del usuario autenticado
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Req() request: Request, @Param('id') orderId: string) {
    const userId = request.user.id;

    return this.orderService.findOneByUser(userId, parseInt(orderId));
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: Request,
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const userId = request.user.id;

    return this.orderService.update(userId, parseInt(orderId), updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Req() request: Request, @Param('id') orderId: string) {
    const userId = request.user.id;

    return this.orderService.remove(userId, parseInt(orderId));
  }

  @Get(':id/status')
  @UseGuards(AuthGuard)
  async getStatus(@Req() request: Request, @Param('id') orderId: string) {
    const userId = request.user.id;

    return this.orderService.getStatus(userId, parseInt(orderId));
  }
}
