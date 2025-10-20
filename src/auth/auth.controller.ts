import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from './jwt.guard';
import { CreateUserDto } from 'src/users/dtoUser/create-user.dto';

@Controller()
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService) {  }

    @UseGuards(JwtGuard)
    @Post('signin')
    signin(@Req() req) {
        const user = req.user;

        return this.authService.auth(user)
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto)

        return this.authService.auth(user)
    }
}
