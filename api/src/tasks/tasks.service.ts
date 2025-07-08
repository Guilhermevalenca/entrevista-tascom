import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { IFilterTask } from '@/interfaces/IFilterTask';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data,
    });
  }

  async findAll(
    userId: string,
    page: number,
    search: string = '',
    filter?: IFilterTask,
  ) {
    const where: Prisma.TaskWhereInput = {
      userId,
      updatedAt: filter?.byDate
        ? {
            gte: filter.byDate.start
              ? startOfDay(new Date(filter.byDate.start))
              : undefined,
            lte: filter.byDate.end
              ? endOfDay(new Date(filter.byDate.end))
              : undefined,
          }
        : undefined,
      status: filter?.byStatus,
      title: {
        contains: search,
        mode: 'insensitive',
      },
    };
    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: (page - 1) * 12,
        take: 12,
        orderBy: {
          updatedAt: filter?.orderDate ?? 'desc',
        },
      }),
      this.prisma.task.count({
        where,
      }),
    ]);
    return {
      tasks,
      total: Math.ceil(total / 12),
    };
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  changeStatus(id: string, undo: boolean = false) {
    return this.prisma.task.update({
      data: {
        status: !undo ? 'completed' : 'pending',
      },
      where: {
        id,
      },
    });
  }
}
