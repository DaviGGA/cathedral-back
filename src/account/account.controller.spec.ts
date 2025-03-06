import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './account.entity';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers:[AccountService],
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const uri = (await MongoMemoryServer.create()).getUri();
            return {uri}
          }
        }),
        MongooseModule.forFeature([
          {
            name: Account.name,
            schema: AccountSchema
          } 
        ])
      ]
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('When creating a account with valid parameters, should return a account', async () => {
    
    const body = {
      email: "john.doe@hotmail.com",
      password: "Johndoe5500!"
    }

    const result = await controller.createAccount(body);

    expect(result.email).toBe(body.email)
    expect(result.password).toBeDefined();
    expect(result._id).toBeDefined();

  });

  it('When creating two accounts with same email, should return error', async () => {
    
    const body = {
      email: "john.doe@hotmail.com",
      password: "Johndoe5500!"
    }

    await controller.createAccount(body);
    
    expect(controller.createAccount(body)).rejects.toThrow()
  });
});
