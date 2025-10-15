import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtoUser/create-user.dto';
import { UpdateUserDto } from './dtoUser/update-user.dto';

@Controller('/users')
export class UsersController {
    constructor(private userService: UsersService) { }
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    getAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    removeOne(@Param('id') id: number) {
        return this.userService.delete(id);
    }

    @Patch(':id')
    updateOne(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto)
    }
}
