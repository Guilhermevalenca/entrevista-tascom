import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User | null> {
    return this.prisma.user.create({
      data: data,
    });
  }

  async find(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
