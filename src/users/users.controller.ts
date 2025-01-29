import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.usersService.logIn(loginDTO.email, loginDTO.password);
  }

  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getUsers() {
    return this.usersService.getUsers();
  }
}
