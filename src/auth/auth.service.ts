import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
    ) {}

    auth(user: User) {
        const payload = { sub: user.id };

        return { access_token: this.jwtService.sign(payload, { secret: 'jwt_secret'}) };
    }
}
