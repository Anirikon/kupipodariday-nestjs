import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dtoOffers/create-offer.dto';

@Controller('offers')
export class OffersController {
    constructor(private offerService: OffersService) { }
    @Post()
    create(@Body() dto: CreateOfferDto) {
        return this.offerService.create(dto)
    }

    @Get()
    getAll() {
        return this.offerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.offerService.findOne(id);
    }
}
