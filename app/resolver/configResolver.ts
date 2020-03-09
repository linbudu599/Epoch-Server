import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Config, ConfigInput } from "../schema/config";

@Resolver(() => Config)
export class MainResolver {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>
  ) {}

  @Query(() => Config, { nullable: true })
  async getConfigs(): Promise<Config> {
    const configs = await this.configRepository.findOne();

    return configs!;
  }

  @Mutation(() => Config, { nullable: true })
  async mutateConfig(
    @Arg("config") { bgImg, avatar }: ConfigInput
  ): Promise<Config> {
    const configs = await this.configRepository.update(1, {
      bgImg,
      avatar
    });

    return await this.configRepository.findOne() as Config;
  }
}
