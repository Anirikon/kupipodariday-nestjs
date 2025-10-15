import { IsJWT } from "class-validator";

export class SigninUserResponseDto {

    @IsJWT()
    access_token: string
}