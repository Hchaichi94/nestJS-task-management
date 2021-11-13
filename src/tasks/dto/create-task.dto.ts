import { IsNotEmpty } from "class-validator";

export class CreatTaskDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string
}

