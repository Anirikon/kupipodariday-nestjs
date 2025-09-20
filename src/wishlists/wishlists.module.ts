import { Module } from '@nestjs/common';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.model';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService],
  imports: [
      TypeOrmModule.forFeature([Wishlist])
    ]
})
export class WishlistsModule {}
