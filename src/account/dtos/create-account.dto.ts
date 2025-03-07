import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateAccountDTO {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
