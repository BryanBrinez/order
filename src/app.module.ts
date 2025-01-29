import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UsersModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
