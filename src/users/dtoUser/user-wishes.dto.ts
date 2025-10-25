import { IsArray, IsDate, IsDecimal, IsString, IsUrl } from "class-validator";
import { Offer } from "src/offers/offer.model";

export class UserWishesDto {
  @IsDecimal()
  id: number;

  @IsDate()
  createdAt: string;

  @IsDate()
  updatedAt: string;

  @IsString()
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsDecimal()
  price: number;

  @IsDecimal()
  raised: number;

  @IsDecimal()
  copied: number;

  @IsString()
  description: string;

  @IsArray()
  offers: Offer[];
}
