import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dtoOffers/create-offer.dto";
import { JwtGuard } from "src/auth/jwt.guard";

@UseGuards(JwtGuard)
@Controller("offers")
export class OffersController {
  constructor(private offerService: OffersService) {}
  @Post()
  create(@Body() dto: CreateOfferDto, @Req() req) {
    return this.offerService.create(req.user.id, dto);
  }

  @Get()
  getAll() {
    return this.offerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.offerService.findOne(id);
  }
}
