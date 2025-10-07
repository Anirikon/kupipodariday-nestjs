import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtoAuth/signin-user.dto';

// @Controller('/auth')
// export class AuthController {
//     constructor(private authService: AuthService) {  }
//     @Post()
//     signin(@Body() dto: SigninUserDto) {
//         return this.authService.findOne()
//     }
// }
