import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class SignupUserResponseDto {
    @IsNumber()
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(64)
    username: string;

    @IsString()
    @MinLength(1)
    @MaxLength(200)
    about: string;

    @IsString()
    avatar: string;

    @IsEmail()
    email: string;

    @IsString()
    createdAt: Date;
    
    @IsString()
    updatedAt: Date;
}