import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Root,
  Int
} from "type-graphql";

import { Article, MutationStatus } from "../schema/article";

import { plainToClass } from "class-transformer";

// Mock Before TypeORM
function createArticleSamples() {
  return plainToClass(Article, [
    {
      aid: 1,
      type: "Thought",
      tag: "FE",
      title: "寒假总结: XXXXX",
      description: "进行一些总结",
      content: "寒假结束啦",
      createdAt: "2020-3-05",
      updatedAt: "2020-3-10"
    },
    {
      aid: 2,
      type: "Thought",
      tag: "FE",
      title: "寒假总结: XXXXX",
      description: "进行一些总结",
      content: "寒假结束啦",
      createdAt: "2020-3-05",
      updatedAt: "2020-3-10"
    },
    {
      aid: 3,
      type: "Thought",
      tag: "FE",
      title: "寒假总结: XXXXX",
      description: "进行一些总结",
      content: "寒假结束啦",
      createdAt: "2020-3-05",
      updatedAt: "2020-3-10"
    },
    {
      aid: 4,
      type: "Thought",
      tag: "FE",
      title: "寒假总结: XXXXX",
      description: "进行一些总结",
      content: "寒假结束啦",
      createdAt: "2020-3-05",
      updatedAt: "2020-3-10"
    }
  ]);
}

@InputType()
export class ArticleInput {
  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  tag?: string;

  @Field()
  title!: string;

  // default description is title
  @Field({ nullable: true })
  description?: string;

  @Field()
  content!: string;
}

@Resolver(() => Article)
@Resolver(() => ArticleInput)
export class ArticleResolver {
  private readonly items: Article[] = createArticleSamples();

  @Query(() => Article, { nullable: true })
  async getArticleByAId(@Arg("aid") aid: number): Promise<Article | undefined> {
    return await this.items.find(Article => Article.aid === aid);
  }

  @Query(() => [Article], { nullable: true })
  async getAllArticles(): Promise<Article[]> {
    return await this.items;
  }

  @Mutation(returns => MutationStatus)
  async create(
    @Arg("info") articleInfo: ArticleInput
  ): Promise<MutationStatus> {
    console.log(articleInfo);
    return {
      aid: 9,
      status: 0,
      updatedAt: "2020-3-05"
    };
  }

  @Mutation(() => MutationStatus)
  async delete(@Arg("aid") aid: number): Promise<MutationStatus> {
    return {
      aid: 9,
      status: 0
    };
  }

  @Mutation(returns => MutationStatus)
  async update(
    @Arg("info") articleInfo: ArticleInput
  ): Promise<MutationStatus> {
    return {
      aid: 9,
      status: 0,
      updatedAt: "2020-3-05"
    };
  }
}
