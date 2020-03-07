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
import { Repository, getRepository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Article, MutationStatus } from "../schema/article";
import { ArticleStatusHandler } from "../util/statusHandler";
import { normalizeCurrent } from "../util/timeParser";

@InputType()
export class ArticleInput {
  @Field()
  aid?: number;

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
export class ArticleResolver {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  @Query(() => Article, { nullable: true })
  async getArticleByAId(@Arg("aid") aid: number): Promise<Article | undefined> {
    const find = await this.articleRepository.findOne({ where: { aid } });

    return find;
  }

  @Query(() => [Article], { nullable: true })
  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  @Mutation(returns => MutationStatus)
  async create(
    @Arg("info") { type, title, tag, description, content }: ArticleInput
  ): Promise<MutationStatus> {
    const article = this.articleRepository.create({
      type,
      title,
      tag,
      description,
      content,
      createdAt: normalizeCurrent()
    });

    await this.articleRepository.save(article);
    console.log(article);
    return new ArticleStatusHandler(1, 1, "111");
  }

  @Mutation(() => MutationStatus)
  async delete(@Arg("aid") aid: number): Promise<MutationStatus> {
    const res = await this.articleRepository.delete(aid);
    // by affected
    console.log(res);
    return new ArticleStatusHandler(1, 1, "111");
  }

  @Mutation(returns => MutationStatus)
  async update(
    @Arg("info") { aid, title, description, content, type, tag }: ArticleInput
  ): Promise<MutationStatus> {
    const article = await this.articleRepository.update(aid!, {
      title,
      description,
      content,
      type,
      tag
    });
    console.log(article);
    return new ArticleStatusHandler(1, 1, "111");
  }
}
