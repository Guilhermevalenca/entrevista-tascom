import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { CryptoService } from '@/crypt/crypt.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '99999999999s' },
    }),
  ],
  providers: [AuthService, CryptoService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
