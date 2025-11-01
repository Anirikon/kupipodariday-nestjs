import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { EncryptionModule } from "src/encryption/encryption.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EncryptionService } from "src/encryption/encryption.service";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EncryptionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt_secret"),
        signOptions: { expiresIn: "60m" },
      }),
      inject: [ConfigService],
      global: true,
    }),
  ],
  providers: [AuthService, JwtStrategy, EncryptionService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
