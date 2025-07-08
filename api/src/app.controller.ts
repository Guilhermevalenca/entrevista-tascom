import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '@/crypt/crypt.service';
import { Prisma, User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/generation-datas')
  async getTest(@Request() req) {
    if (!req.query.quant) {
      return 'Quantidade não informada';
    }
    const userNotExists = await this.prisma.user.findUnique({
      where: {
        email: 'test@example.com',
      },
    });
    let user: User;
    if (userNotExists) {
      user = userNotExists;
    } else {
      user = await this.prisma.user.create({
        data: {
          name: 'test user',
          email: 'test@example.com',
          password: this.cryptoService.encrypt('password'),
        },
      });
    }

    const tasks: Prisma.TaskCreateManyInput[] = [];

    const randomDateTime = () => {
      const start = new Date('2025-01-01T00:00:00.000Z');
      const end = new Date('2025-12-31T23:59:59.999Z');

      const randomTimestamp =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());

      return new Date(randomTimestamp);
    };

    for (let i = 0; i < Number(req.query.quant); i++) {
      const date = randomDateTime();
      tasks.push({
        title: `Task ${i}`,
        description: `Description ${i}`,
        status: !Math.round(Math.random()) ? 'completed' : 'pending',
        userId: user.id,
        createdAt: date,
        updatedAt: date,
      });
    }

    try {
      await this.prisma.task.createMany({
        data: tasks,
      });
    } catch (error) {
      console.log(error);
    }
    return 'dados criados com sucesso';
  }
}
