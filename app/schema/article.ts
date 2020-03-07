import { Field, ObjectType, Int, InputType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("Article")
export class Article {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  aid!: number;

  @Field()
  @Column({ default: "Thoughts" })
  type?: string;

  @Field()
  @Column({ default: "Frontend" })
  tag?: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  content!: string;

  // 2020-3-05
  @Field()
  @Column({ default: () => "NOW()" })
  createdAt?: string;

  @Field()
  @Column({ default: () => "NOW()" })
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
