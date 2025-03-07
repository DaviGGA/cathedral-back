import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Account {
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
