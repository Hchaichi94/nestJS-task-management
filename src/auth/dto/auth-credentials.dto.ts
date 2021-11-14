import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCrendentialsDTO {
    @IsString()
    @MinLength(5)
    @MaxLength(15)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password is too weak' })
    password: string;
}