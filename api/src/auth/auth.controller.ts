import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import loginValidation from '@/auth/validation/loginValidation';
import { User } from '@prisma/client';
import { CryptoService } from '@/crypt/crypt.service';
import { UsersService } from '@/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: User) {
    try {
      loginValidation.parse(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return this.authService.signIn(user.email, user.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @UseGuards(AuthGuard)
  async refreshToken(@Request() req) {
    const user = await this.usersService.find(req.user.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.authService.signIn(
      user.email,
      this.cryptoService.decrypt(user.password),
    );
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
