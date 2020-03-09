import { Field, ObjectType, Int, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("Config")
export class Config {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  bgImg!: string;

  @Field()
  @Column()
  avatar!: string;

  // TODO: Considering
  // @Field()
  // @Column()
  // types!: string;

  // TODO: more config ...
}

@InputType()
export class ConfigInput {
  @Field()
  @Column()
  bgImg?: string;

  @Field()
  @Column()
  avatar?: string;
}
