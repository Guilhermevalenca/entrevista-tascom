import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '@/crypt/crypt.service';
import { UsersController } from '@/users/users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: [UsersService, PrismaService, CryptoService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
