import {
  IsDecimal,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserPublicProfileResponseDto } from "src/users/dtoUser/user-public-profile-response.dto";

export class UpdateWishDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name?: string;

  @IsString()
  link?: string;

  @IsUrl()
  image?: string;

  @IsDecimal({ decimal_digits: "2" })
  price?: number;

  @IsDecimal({ decimal_digits: "2" })
  raised?: number;

  @IsString()
  owner?: UserPublicProfileResponseDto;

  @IsString()
  @MaxLength(1024)
  description?: string;
}
