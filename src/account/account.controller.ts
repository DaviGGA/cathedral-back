import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDTO } from './dtos/create-account.dto';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { Public } from '../shared/decorators/public.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Public()
  @Post()
  async createAccount(
    @Body() createAccount: CreateAccountDTO,
  ): Promise<Account> {
    return this.accountService.createAccount(createAccount);
  }
}
