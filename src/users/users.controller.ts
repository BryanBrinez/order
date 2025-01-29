import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.usersService.logIn(loginDTO.email, loginDTO.password);
  }

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getUsers() {
    return this.usersService.getUsers();
  }
}
