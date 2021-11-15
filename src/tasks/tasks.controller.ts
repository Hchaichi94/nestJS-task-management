import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreatTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskDTO } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }
  private logger = new Logger('TasksController')

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() creatTaskDTO: CreatTaskDTO, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(creatTaskDTO, user)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body() updateTaskDTO: updateTaskDTO, @GetUser() user: User): Promise<Task> {
    const { status } = updateTaskDTO
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Get()
  getTasks(@Query() filterDTO: GetTasksFilterDTO, @GetUser() user: User): Promise<Task[]> {

    this.logger.verbose(`User "${user.username}" retrieving all tasks ,
    filters ${JSON.stringify(filterDTO)}`)

    return this.tasksService.getTasks(filterDTO, user);
  }
}
