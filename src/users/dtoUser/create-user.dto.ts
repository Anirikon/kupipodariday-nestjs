import { IsArray, IsDate, IsDecimal, IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Wish } from "src/wishes/wish.model";
import { Wishlist } from "src/wishlists/wishlist.model";

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

    @IsDecimal()
     id: number

     @IsDate()
         createdAt: Date

     @IsDate()
         updatedAt: Date

    @IsArray()
    wishes: Wish[]

    @IsArray()
    offers: Wish[]

    @IsArray()
    wishlists: Wishlist[]
}