import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { SignInDTO } from './dtos/signin.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO) {
    const foundAccount = await this.accountService.findAccountByEmail(
      signInDTO.email,
    );

    if (!foundAccount) {
      throw new UnauthorizedException();
    }

    const isSamePassword = await compare(
      signInDTO.password,
      foundAccount.password,
    );

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    const accesToken = await this.jwtService.signAsync({
      _id: foundAccount._id,
      email: foundAccount.email,
    });

    return { accesToken };
  }
}
