import { MaxLength, MinLength } from "class-validator";

export class SigninUserDto {
    @MinLength(1)
    @MaxLength(64)
    username: string;

    @MinLength(2)
    password: string;
}