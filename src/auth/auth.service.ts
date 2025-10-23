import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    auth(user: User) {
        const payload = { sub: user.id };

        return { access_token: this.jwtService.sign(payload, { secret: 'jwt_secret'}) };
    }

      async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username); 

    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (user && user.password === password) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return user;
    }

    return null;
    }
}
