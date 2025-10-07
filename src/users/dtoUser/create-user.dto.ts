import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    @MaxLength(64)
    username: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    about: string
    
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(2)
    password: string;
    

    @IsOptional()
    @IsString()
    avatar: string

}