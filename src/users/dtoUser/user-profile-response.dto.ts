import {
  IsDate,
  IsDecimal,
  IsEmail,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserProfileResponseDto {
  @IsDecimal()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: string;

  @IsDate()
  updatedAt: string;
}
