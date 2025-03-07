import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Account, AccountSchema } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, 
        AccountService, 
      ],
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const uri = (await MongoMemoryServer.create()).getUri();
            return { uri };
          },
        }),
        JwtModule.register({
              global: true,
              secret: 'test',
              signOptions: { expiresIn: '3600s' },
            }),
        MongooseModule.forFeature([
          {
            name: Account.name,
            schema: AccountSchema,
          },
        ]),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    accountService = module.get<AccountService>(AccountService);
  });

  it('When given a correct login it should return a token', async () => {
    const body = {
      email: "john.doe@hotmail.com",
      password: "Pass1234!"
    }

    await accountService.createAccount(body);

    const { accesToken } = await controller.signIn({
      ...body, 
      password: body.password
    });

    expect(accesToken).toBeTruthy();
  });
});
