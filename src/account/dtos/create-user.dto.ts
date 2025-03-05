import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDTO {

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}