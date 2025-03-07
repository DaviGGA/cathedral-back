import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.entity';
import { Model } from 'mongoose';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { hash } from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<Account>,
  ) {}

  async createAccount(createAccount: CreateAccountDTO): Promise<Account> {
    const SALT_ROUNDS = 8;

    const hashedPassword = await hash(createAccount.password, SALT_ROUNDS);

    return this.accountModel.create({
      email: createAccount.email,
      password: hashedPassword,
    });
  }

  async findAccountByEmail(email: string) {
    return this.accountModel.findOne({ email });
  }
}
