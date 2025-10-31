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

   async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await this.encryptionService.verifyPassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
