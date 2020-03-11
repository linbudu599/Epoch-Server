import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ConfigStatusHandler } from "../util/statusHandler";
import { Config, ConfigInput, ConfigMutationStatus } from "../schema/config";

@Resolver(() => Config)
export class MainResolver {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>
  ) {}

  @Query(() => Config, { nullable: true })
  async getConfigs(@Arg("uid") uid: number): Promise<Config> {
    // TODO: find customize config by uid
    const configs = await this.configRepository.findOne();

    return configs!;
  }

  // optional config key name
  @Mutation(() => ConfigMutationStatus)
  async changeConfig(
    @Arg("uid") uid: number,
    @Arg("bgImd") bgImg: string,
    @Arg("avatar") avatar: string
  ): Promise<ConfigStatusHandler> {
    const configs = await this.configRepository.update(1, {
      bgImg,
      avatar
    });
    return new ConfigStatusHandler(1, "success", []);
  }
}
