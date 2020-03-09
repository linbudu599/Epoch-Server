import { Resolver, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Repository, In } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { UserStatusHandler } from "../util/statusHandler";
import { Article, MutationStatus } from "../schema/article";
import { ArticleStatusHandler } from "../util/statusHandler";
import { normalizeCurrent } from "../util/timeParser";
import { User, Status } from "../schema/user";

@Resolver(() => Article)
export class MainResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  @Query(() => [Article] || Status, { nullable: true })
  async getAllArticlesById(@Arg("uid") uid: number): Promise<any> {
    // const user = this.userRepository.create({
    //   account: "linbududu",
    //   secret: "budubudu",
    //   ownedArticles: "1,2,3"
    // });

    // await this.userRepository.save(user);

    // 还要做一个不存在的报错
    // find owned articles
    const userInfo = (await this.userRepository.findOne({
      where: { id: uid }
    })) as User;

    if (!userInfo.ownedArticles) {
      console.log("oops!!!!!!");
      return "xxx";
    }

    // "1,2,3"
    const aids = userInfo
      .ownedArticles!.split(",")
      .map((item: string) => parseInt(item, 10));

    const articleCollections = await this.articleRepository.find({
      aid: In(aids)
    });
    return articleCollections;
  }
}
