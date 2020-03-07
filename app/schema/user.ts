import { Field, ObjectType, Int, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// String is not offered

@ObjectType()
@Entity("User")
export class User {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  uid!: number;

  @Field()
  @Column({ unique: true })
  account!: string;

  @Field()
  @Column()
  secret?: string;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true, default: 10 })
  auth?: number;
}

@ObjectType()
export class Status {
  @Field(type => Int)
  // 0:success 1:failure
  code!: number;

  @Field()
  token?: string;

  @Field()
  message?: string;
}
