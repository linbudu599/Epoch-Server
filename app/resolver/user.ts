import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Float,
  Int,
  ResolverInterface
} from "type-graphql";

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

@Resolver(of => User)
export class UserResolver {
  private readonly items: User[] = createUserSamples();

  @Query(returns => User, { nullable: true })
  async User(
    @Arg("account") account: string,
    @Arg("secret") secret: string
  ): Promise<User | undefined> {
    return await this.items.find(
      User => User.account === account && User.secret === secret
    );
  }

  @Query(returns => Status, { nullable: true })
  async Login(
    @Arg("account") account: string,
    @Arg("secret") secret: string
  ): Promise<Status> {
    return {
      code: 1,
      token: "token",
      message: "Success"
    };
  }

  @Query(returns => [User])
  async Users(): Promise<User[]> {
    return await this.items;
  }

  @Mutation(returns => [User])
  async Register(): Promise<Status> {
    return {
      code: 1,
      token: "token",
      message: "Success"
    };
  }
}
