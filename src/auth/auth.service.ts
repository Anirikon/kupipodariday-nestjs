import { Injectable } from "@nestjs/common";
import { User } from "src/users/user.model";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { EncryptionService } from "src/encryption/encryption.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private encryptionService: EncryptionService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { secret: "jwt_secret" }),
    };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (user) {
      const isPasswordValid = await this.encryptionService.verifyPassword(
        password,
        user.password,
      );

      if (isPasswordValid) {
        // Убираем пароль из возвращаемого объекта
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user;
        return result;
      }
    }

    return null;
  }
}
