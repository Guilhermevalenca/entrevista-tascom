import type { IFilterTask } from '@/interfaces/IFilterTask.ts';
import axiosPlugin from '@/plugin/axiosPlugin.ts';
import type { ITask } from '@/interfaces/ITask.ts';

export default new (class TaskService {
  async index(page: number = 1, search?: string, filter?: IFilterTask) {
    const { data } = await axiosPlugin.post('/tasks/index', {
      params: {
        page,
        search,
      },
      data: {
        filter,
      },
    });

    return {
      tasks: data.tasks.map((task: Partial<ITask>) => ({
        ...task,
        createdAt: task.createdAt ? new Date(task.createdAt) : null,
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : null,
      })),
      total: data.total,
    };
  }

  async register(task: ITask) {
    try {
      const { data } = await axiosPlugin.post('/tasks', task);

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async show(id: string) {
    try {
      const { data } = await axiosPlugin.get(`/tasks/${id}`);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async update(id: string, task: ITask) {
    try {
      const { data } = await axiosPlugin.put(`/tasks/${id}`, {
        title: task.title,
        description: task.description,
        status: task.status,
      });
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async changeStatus(task: ITask) {
    const undo = task.status === 'completed';
    const { data } = await axiosPlugin.patch(`/tasks/${task.id}` + (undo ? '/undo' : ''));
    task.status = data.status;
    task.updatedAt = new Date(data.updatedAt);
  }

  async delete(id: string) {
    try {
      const { data } = await axiosPlugin.delete(`/tasks/${id}`);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
})();
