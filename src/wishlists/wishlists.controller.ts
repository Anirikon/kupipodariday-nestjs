import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('wishlists')
export class WishlistsController {
    constructor(private wishService: WishlistService) {   }
    @Post()
    create(@Body() dto: CreateWislistDto) {
        return this.wishService.create(dto);
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
    removeOne(@Param('id') id: number) {
        return this.wishService.delete(id);
    }

    @Patch(':id')
    updateOne(@Param('id') id: number, @Body() dto: UpdateWishlistDto) {
        return this.wishService.update(id, dto)
    }
}
