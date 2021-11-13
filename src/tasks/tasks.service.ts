import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreatTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.dto';
import { updateTaskDTO } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    const { search, status } = filterDTO

    console.log("status", status);

    let tasks = this.getAllTasks()
    console.log("tasks", tasks);
    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }
    console.log("tasks status", tasks);
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true
        }
        return false
      })
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(_creatTaskDTO: CreatTaskDTO): Task {
    const { title, description } = _creatTaskDTO

    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id != id)
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    let task = this.getTaskById(id)
    task.status = status;
    return task;
  }

}
