import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskDTO } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() creatTaskDTO: CreatTaskDTO): Promise<Task> {
    return this.tasksService.createTask(creatTaskDTO)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskDTO: updateTaskDTO): Promise<Task> {
    const { status } = updateTaskDTO
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO);
  }
}
