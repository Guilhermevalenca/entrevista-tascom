import {
  Body,
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from '@/tasks/tasks.service';
import { Task } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';
import storeTaskValidation from '@/tasks/validation/storeTaskValidation';
import updateTaskValidation from '@/tasks/validation/updateTaskValidation';
import filterTaskValidation from '@/tasks/validation/filterTaskValidation';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('index')
  @UseGuards(AuthGuard)
  async index(@Request() req) {
    console.log(req.body.data.filter);
    try {
      filterTaskValidation.parse({
        ...req.body.data,
        page: Number(req.body.params.page),
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
    return this.tasksService.findAll(
      req.user.id,
      Number(req.body.params.page ?? 1),
      req.body.params.search,
      req.body.data.filter,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  async store(@Body() data: Task, @Request() req) {
    try {
      storeTaskValidation.parse(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return this.tasksService.create({
      ...data,
      user: {
        connect: {
          id: req.user.id,
        },
      },
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async show(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() data: Task) {
    try {
      updateTaskValidation.parse(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return this.tasksService.update(id, data);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async completedTask(@Param('id') id: string) {
    return this.tasksService.changeStatus(id);
  }

  @Patch(':id/undo')
  @UseGuards(AuthGuard)
  async undoTask(@Param('id') id: string) {
    return this.tasksService.changeStatus(id, true);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async destroy(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
