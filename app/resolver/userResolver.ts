import { Resolver, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Length, IsString } from "class-validator";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserStatusHandler } from "../util/statusHandler";

import { User, Status } from "../schema/user";

@InputType()
export class UserInput {
  @Length(3, 15, { message: "account length: 3-15" })
  @IsString()
  @Field()
  account!: string;

  @Length(6, 12, { message: "secret length: 6-12" })
  @IsString()
  @Field()
  secret!: string;
}

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(() => Status, { nullable: true })
  async Login(
    @Arg("account") account: string,
    @Arg("secret") secret: string
  ): Promise<Status> {
    const res = await this.userRepository.findOne({
      where: { account, secret }
    });

    return res
      ? new UserStatusHandler(0, "token", "success")
      : new UserStatusHandler(1, "token", "failure");
  }

  @Query(() => [User])
  async Users(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Mutation(() => Status)
  async Register(@Arg("user") { account, secret }: UserInput): Promise<Status> {
    const isExisted = await this.userRepository.find({
      where: { account }
    });

    if (isExisted) {
      return new UserStatusHandler(10002, "x", "Account Existed");
    }

    const newUser = this.userRepository.create({
      account,
      secret
    });

    try {
      await this.userRepository.save(newUser);
      return new UserStatusHandler(10000, "token", "suuccess");
    } catch (err) {
      return new UserStatusHandler(10010, "error", err);
    }
  }

  @Mutation(() => Status)
  async Destory(@Arg("user") { account, secret }: UserInput): Promise<Status> {
    const accountInfo = await this.userRepository.find({
      where: { account, secret }
    });

    if (accountInfo) {
      return new UserStatusHandler(10003, "x", "Account Dosen't Exist");
    }

    try {
      await this.userRepository.delete(accountInfo);
      return new UserStatusHandler(1, "token", "suuccess");
    } catch (err) {
      return new UserStatusHandler(10010, "error", err);
    }
  }
}
