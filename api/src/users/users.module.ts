import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '@/crypt/crypt.service';
import { UsersController } from '@/users/users.controller';

@Module({
  providers: [UsersService, PrismaService, CryptoService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
