import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponseDto } from './dto/login-response.dto';
import { SimpleResponseDto } from './dto/simple-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();
      const { password: _, ...savedUser } = newUser.toJSON();

      return savedUser;
    } catch (error) {
      if (error.code === 11000) {
        // Entrada duplicada
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    await this.create(createUserDto);

    return this.login({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const [user] = await Promise.all([this.userModel.findOne({ email })]);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...rest } = user.toJSON();
    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(email: string): Promise<User> {
    const [user] = await Promise.all([this.userModel.findOne({ email })]);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const [user] = await Promise.all([this.userModel.findById(id)]);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(email: string): Promise<SimpleResponseDto> {
    const deleteUser: DeleteResult = await this.userModel.deleteOne({ email });

    if (deleteUser.deletedCount === 0) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return {
      status: 200,
      message: 'User with email ' + email + ' was removed!',
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
