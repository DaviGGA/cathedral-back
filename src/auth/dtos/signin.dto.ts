import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
