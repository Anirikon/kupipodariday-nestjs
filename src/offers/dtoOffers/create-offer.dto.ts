import { IsBoolean, IsDecimal } from "class-validator";

export class CreateOfferDto {
  @IsDecimal()
  itemId: number;

  @IsDecimal({ decimal_digits: "2" })
  amount: number;

  @IsBoolean()
  hidden: boolean;
}
