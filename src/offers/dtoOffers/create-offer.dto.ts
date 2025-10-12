import { IsBoolean, IsDecimal, IsNumber, IsUrl } from "class-validator"
import { Wish } from "src/wishes/wish.model"

export class CreateOfferDto {

    @IsNumber()
    user: number

    @IsUrl()
    item: Wish

    @IsDecimal({ decimal_digits: '2'} )
    amount: number

    @IsBoolean()
    hidden: boolean
}