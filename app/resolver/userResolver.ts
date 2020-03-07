import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  InputType,
  Field
} from "type-graphql";

import { Repository, getRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserStatusHandler } from "../util/statusHandler";

import { User, Status } from "../schema/user";

@InputType()
export class UserInput {
  @Field()
  account!: string;

  @Field()
  secret!: string;
}

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(returns => Status, { nullable: true })
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

  // TODO: FieldResolver?
  @Query(() => [User])
  async Users(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Mutation(() => Status)
  async Register(@Arg("user") { account, secret }: UserInput): Promise<Status> {
    const newUser = this.userRepository.create({
      account,
      secret
    });

    const res = await this.userRepository.save(newUser);

    // TODO: deal: unique name & validator
    console.log(res);

    return new UserStatusHandler(1, "token", "suuccess");
  }
}
