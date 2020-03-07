import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid!: number;

  @Column()
  account!: string;

  @Column()
  secret!: string;

  @Column()
  auth!: number;
}
