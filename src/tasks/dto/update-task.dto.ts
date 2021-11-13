import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class updateTaskDTO {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}

