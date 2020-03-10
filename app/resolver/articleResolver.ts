import { Resolver, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Repository } from "typeorm";
import {
  MaxLength,
  IsIn,
  IsString,
  IsNumber,
  ValidateIf,
  Min
} from "class-validator";
import { InjectRepository } from "typeorm-typedi-extensions";
import checkIfExist from "../util/checkIfExist";
import { Article, MutationStatus } from "../schema/article";
import { ArticleStatusHandler } from "../util/statusHandler";
import { normalizeCurrent } from "../util/timeParser";

@InputType()
export class ArticleInput {
  @Field()
  @ValidateIf(item => item.aid !== 9999)
  @IsNumber()
  @Min(0, { message: "aid should not be less than 0" })
  aid?: number;

  @Field({ nullable: true })
  @MaxLength(30, { message: "type field max length: 30" })
  @IsIn(["Thoughts", "Life", "Work"])
  type?: string;

  @Field({ nullable: true })
  @MaxLength(30, { message: "tag field max length: 30" })
  @IsString()
  tag?: string;

  @Field()
  @MaxLength(30, { message: "title field max length: 30" })
  @IsString()
  title!: string;

  // default description is title
  @Field({ nullable: true })
  @MaxLength(200, { message: "description field max length: 200" })
  @IsString()
  description?: string;

  @Field()
  @IsString()
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
    const res = await this.articleRepository.findOne({ where: { aid } });

    return res;
  }

  @Query(() => [Article], { nullable: true })
  async getAllArticles(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  @Mutation(() => MutationStatus)
  async create(
    // @Arg("info") { type, title, tag, description, content }: ArticleInput
    @Arg("type") type: string,
    @Arg("title") title: string,
    @Arg("tag") tag: string,
    @Arg("description") description: string,
    @Arg("content") content: string
  ): Promise<MutationStatus> {
    const article = this.articleRepository.create({
      type,
      title,
      tag,
      description,
      content,
      createdAt: normalizeCurrent()
    });

    try {
      const res = await this.articleRepository.save(article);
      return new ArticleStatusHandler(res.aid!, 20000, "Mutation Success");
    } catch (err) {
      return new ArticleStatusHandler(9999, 20001, "Mutation Failure");
    }
  }

  @Mutation(() => MutationStatus)
  async delete(@Arg("aid") aid: number): Promise<MutationStatus> {
    try {
      const res = await this.articleRepository.delete(aid);
      // by affected
      console.log(res);
      return new ArticleStatusHandler(10000, 20000, "Delete Success");
    } catch (err) {
      return new ArticleStatusHandler(9999, 20001, "Delete Failure");
    }
  }

  @Mutation(() => MutationStatus)
  async update(
    // @Arg("info") { aid, title, description, content, type, tag }: ArticleInput
    @Arg("aid") aid: number,
    @Arg("type") type: string,
    @Arg("title") title: string,
    @Arg("tag") tag: string,
    @Arg("description") description: string,
    @Arg("content") content: string
  ): Promise<MutationStatus> {
    const res = await checkIfExist(this.articleRepository, { aid });

    if (!res) {
      return new ArticleStatusHandler(aid!, 20001, "Article Doesn't Exist'");
    }

    try {
      await this.articleRepository.update(aid!, {
        title,
        description,
        content,
        type,
        tag
      });
      return new ArticleStatusHandler(aid!, 20000, "Update Success");
    } catch (err) {
      return new ArticleStatusHandler(aid!, 20010, "");
    }
  }
}
