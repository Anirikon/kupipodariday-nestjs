import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.model";
import { EncryptionService } from "src/encryption/encryption.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, EncryptionService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule.forFeature([User]), UsersService],
})
export class UsersModule {}
