import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreatTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskDTO } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) { }

  getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDTO, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user })
    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`)
    }
    return found
  }

  createTask(_creatTaskDTO: CreatTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(_creatTaskDTO, user)
  }


  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user })
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`)
    }
  }
  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user)
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

}
