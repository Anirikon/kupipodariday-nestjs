import { ArrayMinSize, IsArray, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { Wish } from "src/wishes/wish.model";


export class UpdateWishlistDto {

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    name?: string;

    @IsString()
    @MaxLength(1500)
    description?: string;

    @IsUrl()
    image?: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsUrl({}, { each: true })
    items?: Wish[];
}