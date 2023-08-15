/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';
import { UserStatusValidationPipes } from './pipes/user-status-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('/users')
  findAll(
    @Query(UserStatusValidationPipes) filterDto: SearchUserDto,
  ): Promise<User[]> {
    return this.authService.findAll(filterDto);
  }

  @Get('/users/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.authService.findOne(id);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
