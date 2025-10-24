import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dtoWish/create-wish.dto';
import { UpdateWishDto } from './dtoWish/update-wish.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('/wishes')
export class WishesController {
    constructor(private wishService: WishesService) {   }
    @Post()
    create(@Body() dto: CreateWishDto, @Req() req) {
        return this.wishService.create(dto, req.user);
    }

    @Get()
    getAll() {
        return this.wishService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.wishService.findOne(id);
    }

    @Delete(':id')
    removeOne(@Param('id') id: number, @Req() req) {
        return this.wishService.delete(id, req.user);
    }

    @Patch(':id')
    updateOne(@Param('id') id: number, @Body() dto: UpdateWishDto, @Req() req) {
        return this.wishService.update(id, dto, req.user)
    }

    @Get('last')
    getLastWishes() {
        return this.wishService.getLastWishes();
    }

    @Get('top')
    getTopWishes() {
        return this.wishService.getLastWishes();
    }

    @Post(':id/copy')
    copyWish(@Param('id') id: number, @Req() req) {
        return this.wishService.copyWish(id, req.user)
    }
}
