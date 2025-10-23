import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtoUser/create-user.dto';
import { UpdateUserDto } from './dtoUser/update-user.dto';
import { FindUserDto } from './dtoUser/find-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get('me')
    findMe(@Req() req) {
        return this.userService.findOneById(req.user.id)
    }

    @Get('find')
    findMany(@Query() findUserDto: FindUserDto) {
        return this.userService.findManyUsers(findUserDto)
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    removeOne(@Param('id') id: number) {
        return this.userService.delete(id);
    }

    @Patch('me')
    updateOne(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto)
    }

    @Get('me/wishes')
    getMyWishes(@Req() req) {
        return this.userService.getMyWishes(req.user.id)
    }
    
    @Get(':username')
    findOneByUsername(@Param('username') username: string) {
        return this.userService.findOneByUsername(username)
    }

    @Get(':username/wishes')
    getUsernameWishes(@Query() findUserDto: FindUserDto) {
        return this.userService.findUserWishes(findUserDto)
    }
}
