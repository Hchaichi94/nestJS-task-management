import { EntityRepository, Repository } from "typeorm";
import { CreatTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    async createTask(_creatTaskDTO: CreatTaskDTO): Promise<Task> {
        const { title, description } = _creatTaskDTO
        const task = this.create(
            {
                title,
                description,
                status: TaskStatus.OPEN
            }
        )
        await this.save(task)
        return task
    }

    async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
        const { status, search } = filterDTO

        const query = this.createQueryBuilder('task');


        status && query.andWhere('task.status =:status', { status })

        search && query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
            { search: `%${search}%` })


        const tasks = await query.getMany()
        return tasks

    }
}
