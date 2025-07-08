import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { UsersService } from './users/users.service';
import { AuthModule } from '@/auth/auth.module';
import { CryptoService } from '@/crypt/crypt.service';
import { TasksService } from '@/tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    UsersService,
    CryptoService,
    TasksService,
  ],
})
export class AppModule {}
