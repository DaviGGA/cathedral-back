import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDTO {
  @IsEmail({}, {message: "This provided email is not valid."})
  readonly email: string;

  @IsStrongPassword({}, {message: "Password must be at least 8 characters long, contain at least one: lowercase and uppercase letter;number and special symbol." })
  readonly password: string;
}
