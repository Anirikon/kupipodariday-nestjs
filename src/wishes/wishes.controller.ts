import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { CreateWishDto } from "./dtoWish/create-wish.dto";
import { UpdateWishDto } from "./dtoWish/update-wish.dto";

@Controller("/wishes")
export class WishesController {
  constructor(private wishService: WishesService) {}
  @Post()
  create(@Body() dto: CreateWishDto) {
    return this.wishService.create(dto);
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
  removeOne(@Param("id") id: number) {
    return this.wishService.delete(id);
  }

  @Patch(":id")
  updateOne(@Param("id") id: number, @Body() dto: UpdateWishDto) {
    return this.wishService.update(id, dto);
  }
}
