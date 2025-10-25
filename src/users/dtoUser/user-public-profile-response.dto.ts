import {
  IsDate,
  IsDecimal,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserPublicProfileResponseDto {
  @IsDecimal()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
