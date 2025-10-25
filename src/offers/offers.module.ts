import { Module } from "@nestjs/common";
import { OffersController } from "./offers.controller";
import { OffersService } from "./offers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./offer.model";

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [TypeOrmModule.forFeature([Offer])],
})
export class OffersModule {}
