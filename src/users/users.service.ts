import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, encrypt } from 'src/libs/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async logIn(email: string, password: string) {
    try {
      const userFound = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!userFound) {
        throw new BadRequestException(`Email or password incorrect`);
      }

      const isMatch = await compare(password, userFound.password);

      if (!isMatch) {
        throw new BadRequestException(`Email or password incorrect`);
      }

      const access_token = await this.jwtService.signAsync({
        id: userFound.id,
        email: userFound.email,
      });

      return { access_token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error loggin in`);
    }
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const userFound = await this.prismaService.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (userFound) {
        throw new BadRequestException(`User already exists`);
      }

      const hashedPassword = await encrypt(createUserDto.password);

      const user = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithOutPass } = user;

      const access_token = await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      });

      return { access_token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error creating user`);
    }
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }
}
