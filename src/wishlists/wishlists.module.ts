import { Module } from "@nestjs/common";
import { WishlistsController } from "./wishlists.controller";
import { WishlistsService } from "./wishlists.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wishlist } from "./wishlist.model";
import { WishesModule } from "src/wishes/wishes.module";

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService],
  imports: [TypeOrmModule.forFeature([Wishlist]),
  WishesModule,]
})
export class WishlistsModule {}
