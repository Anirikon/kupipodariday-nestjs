import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dtoUser/create-user.dto";
import { LocalGuard } from "./local.guard";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.model";
import { Repository } from "typeorm";

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @UseGuards(LocalGuard)
  @Post("signin")
  signin(@Req() req) {
    console.log(req)
    const user = req.user;

    return this.authService.auth(user);
  }


  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    const foundUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (!foundUser) {
      throw new NotFoundException("Пользователь не найден");
    }
    return this.authService.auth(foundUser);
  }
}
