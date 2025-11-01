import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { CreateWishlistDto } from "./dtoWishlist/create-wishlist.dto";
import { WishlistsService } from "./wishlists.service";
import { UpdateWishlistDto } from "./dtoWishlist/update-wishlist.dto";

@Controller("wishlists")
export class WishlistsController {
  constructor(private wishService: WishlistsService) {}
  @Post()
  create(@Body() dto: CreateWishlistDto, @Req() req) {
    return this.wishService.create(req.user, dto);
  }

  @Get()
  getAll() {
    return this.wishService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.wishService.findOne(id);
  }

  @Delete(":id")
  removeOne(@Param("id") id: number, @Req() req) {
    return this.wishService.delete(id, req.user);
  }

  @Patch(":id")
  updateOne(
    @Param("id") id: number,
    @Body() dto: UpdateWishlistDto,
    @Req() req,
  ) {
    return this.wishService.update(id, dto, req.user);
  }
}
