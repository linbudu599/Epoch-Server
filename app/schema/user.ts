import { Field, ObjectType, Int, InputType } from "type-graphql";

// String is not offered

@ObjectType()
export class User {
  @Field(type => Int)
  uid!: number;

  @Field()
  account!: string;

  @Field()
  secret!: string;

  @Field(type => Int)
  authority!: number;
}

@ObjectType()
export class Status {
  @Field(type => Int)
  // 0:success 1:failure
  code!: number;

  @Field()
  token!: string;

  @Field()
  message?: string;
}
