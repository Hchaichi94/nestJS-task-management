import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDTO } from "./dto/get-tasks.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    private logger = new Logger('TasksRepository')

    async createTask(_creatTaskDTO: CreatTaskDTO, user: User): Promise<Task> {
        const { title, description } = _creatTaskDTO
        const task = this.create(
            {
                title,
                description,
                status: TaskStatus.OPEN,
                user,
            }
        )
        await this.save(task)
        return task
    }

    async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
        const { status, search } = filterDTO

        const query = this.createQueryBuilder('task');

        query.where({ user })
        status && query.andWhere('task.status =:status', { status })

        search && query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
            { search: `%${search}%` })

        try {
            const tasks = await query.getMany()
            return tasks
        } catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}`, error.stack)
            throw new InternalServerErrorException();
        }

    }
}
