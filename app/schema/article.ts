import { Field, ObjectType, Int, InputType } from "type-graphql";

@ObjectType()
export class Article {
  @Field(type => Int)
  aid!: number;

  @Field()
  type?: string;

  @Field()
  tag?: string;

  @Field()
  title!: string;

  // default description is title
  @Field()
  description?: string;

  @Field()
  content!: string;

  // TODO: send dealed time info to client like
  // 2020-3-05
  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}

@ObjectType()
export class MutationStatus {
  @Field(type => Int)
  aid!: number;

  // 0 mutation success
  @Field()
  status!: number;

  // when create or update an article info,
  // this field would be send back to client
  @Field()
  updatedAt?: string;
}
