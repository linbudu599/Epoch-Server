import { Resolver, Query, Arg } from "type-graphql";
import { Repository, In } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Article } from "../schema/article";
import { User } from "../schema/user";

@Resolver(() => Article)
export class MainResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  @Query(() => [Article], { nullable: true })
  async FetchOwnedArticlesByUid(@Arg("uid") uid: number): Promise<any> {
    // 还要做一个不存在的报错
    // 放在context里做吧
    const userInfo = await this.userRepository.findOne({
      where: { uid }
    });

    if (!userInfo) {
      return [];
    }
    const aids = userInfo
      .ownedArticles!.split(",")
      .map((item: string) => parseInt(item, 10));

    const articleCollections = await this.articleRepository.find({
      aid: In(aids)
    });
    return articleCollections;
  }
}
