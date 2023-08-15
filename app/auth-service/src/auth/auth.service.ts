/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  async register(registerDto: RegisterDto) {

    const user = this.userRepository.register(registerDto);
    return user;
  }

  async findAll(filterDto: SearchUserDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      relations: ['role'],
      where: {
        id,
      },
    });
  }

  async login(loginDto: LoginDto) {

    return this.userRepository.login(loginDto);
  }
}
