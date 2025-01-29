import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      const order = await this.prismaService.order.create({
        data: {
          ...createOrderDto,
          userId,
        },
        include: { user: true },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = order.user;

      const sanitizedOrder = {
        ...order,
        user: userWithoutPassword,
      };
      return sanitizedOrder;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Error al crear el pedido');
    }
  }

  async findAllByUser(userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const orders = await this.prismaService.order.findMany({
        where: { userId },
        include: { user: true },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const sanitizedOrders = orders.map((order) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = order.user;
        return {
          ...order,
          user: userWithoutPassword,
        };
      });
      return sanitizedOrders;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Error al obtener los pedidos');
    }
  }

  async findOneByUser(userId: number, orderId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const order = await this.prismaService.order.findUnique({
        where: { id: orderId, userId },
      });

      if (!order) {
        throw new NotFoundException('Pedido no encontrado');
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el pedido');
    }
  }

  async update(
    userId: number,
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      const order = await this.prismaService.order.findUnique({
        where: { id: orderId, userId },
      });

      if (!order) {
        throw new NotFoundException('Pedido no encontrado');
      }

      const updatedOrder = await this.prismaService.order.update({
        where: { id: orderId },
        data: updateOrderDto,
      });

      return updatedOrder;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el pedido');
    }
  }

  async remove(userId: number, orderId: number) {
    try {
      const product = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!product) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const order = await this.prismaService.order.findUnique({
        where: { id: orderId, userId },
      });

      if (!order) {
        throw new NotFoundException('Pedido no encontrado');
      }

      await this.prismaService.order.delete({
        where: { id: orderId },
      });

      return { message: 'Pedido eliminado correctamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al eliminar el pedido');
    }
  }

  async getStatus(userId: number, orderId: number) {
    try {
      const product = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!product) {
        throw new BadRequestException('Usuario no encontrado');
      }
      const order = await this.prismaService.order.findUnique({
        where: { id: orderId, userId },
        select: { status: true },
      });

      if (!order) {
        throw new NotFoundException('Pedido no encontrado');
      }

      return { status: order.status };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error al obtener el estado del pedido');
    }
  }
}
