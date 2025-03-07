import { IsEmail, IsStrongPassword} from 'class-validator';

export class CreateAccountDTO {
  @IsEmail({}, {message: "This provided email is not valid."})
  readonly email: string;

  @IsStrongPassword({}, {message: "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special symbol!" })
  readonly password: string;
}
