import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class updateTaskDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}

