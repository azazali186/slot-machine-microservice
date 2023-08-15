/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { AES, enc } from 'crypto-js';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SearchUserDto } from './dto/search-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { Token } from './entities/token.entity';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async getUsers(filterDto: SearchUserDto): Promise<User[]> {
    const { status, search } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (status) {
      query.andWhere('user.status = :status', { status });
    }
    if (search) {
      query.andWhere('(user.name LIKE :search OR user.email LIKE :search)', {
        search: `%${search}%`,
      });
    }

    const products = await query
      .leftJoinAndSelect('user.role', 'role')
      .getMany();

    return products;
  }

  async register(registerDto: RegisterDto) {
    const { name, email } = registerDto;
    const oldUser = await this.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    let roleId;
    let roleName;
    let role = await Role.findOne({
      where: {
        name: 'customer',
      },
    });
    if (!role) {
      role = Role.create({
        name: 'customer',
      });
      await role.save();

      roleId = role.id;
      roleName = role.name;
    } else {
      roleId = role.id;
      roleName = role.name;
    }
    if (oldUser) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User registered with ${email} email`,
      });
    }
    const hashPassord = AES.encrypt(
      registerDto.password,
      process.env.ENCRYPTION_KEY,
    ).toString();

    const user = new User();
    user.name = name;
    user.email = email.toLowerCase();
    user.password = hashPassord;
    user.role = [role];
    await user.save();
    const { status, password, ...others } = user;

    return { ...others };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: `User not registered with ${email} email`,
      });
    }

    const hashPassord = AES.decrypt(
      user.password,
      process.env.ENCRYPTION_KEY,
    ).toString(enc.Utf8);
    if (hashPassord === password) {
      const { password, status, ...others } = user;
      const payload = { sub: user.id, username: user.email };
      const token = await this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_SECRET}`,
      });
      return {
        ...others,
        token: AES.encrypt(token, process.env.ENCRYPTION_KEY_TOKEN).toString(),
      };
    }

    throw new NotFoundException({
      statusCode: 404,
      message: `Email and password combination incorrect`,
    });
  }
}
