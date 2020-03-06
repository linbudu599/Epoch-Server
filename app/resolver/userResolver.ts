import { Resolver, Query, Arg, Mutation } from "type-graphql";

import { User, Status } from "../schema/user";

import { plainToClass } from "class-transformer";

// Mock Before TypeORM
function createUserSamples() {
  return plainToClass(User, [
    {
      uid: 1,
      account: "linbudu",
      secret: "budubudu",
      auth: 10
    },

    {
      uid: 2,
      account: "linbudu",
      secret: "budubudu",
      auth: 10
    },

    {
      uid: 3,
      account: "linbudu",
      secret: "budubudu",
      auth: 10
    }
  ]);
}

@Resolver(() => User)
export class UserResolver {
  private readonly items: User[] = createUserSamples();

  @Query(() => User, { nullable: true })
  async User(
    @Arg("account") account: string,
    @Arg("secret") secret: string
  ): Promise<User | undefined> {
    return await this.items.find(
      User => User.account === account && User.secret === secret
    );
  }

  @Query(() => Status, { nullable: true })
  async Login(): Promise<Status> {
    return {
      code: 1,
      token: "token",
      message: "Success"
    };
  }

  @Query(() => [User])
  async Users(): Promise<User[]> {
    return await this.items;
  }

  @Mutation(() => [User])
  async Register(): Promise<Status> {
    return {
      code: 1,
      token: "token",
      message: "Success"
    };
  }
}
