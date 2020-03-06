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

import { Recipe } from "../schema/index";

import { plainToClass } from "class-transformer";
function createRecipeSamples() {
  return plainToClass(Recipe, [
    {
      title: "Recipe 1",
      description: "Desc 1",
      ratings: [0, 3, 1],
      creationDate: new Date("2018-04-11")
    },
    {
      title: "Recipe 2",
      description: "Desc 2",
      ratings: [4, 2, 3, 1],
      creationDate: new Date("2018-04-15")
    },
    {
      title: "Recipe 3",
      description: "Desc 3",
      ratings: [5, 4],
      creationDate: new Date()
    }
  ]);
}

@Resolver(of => Recipe)
export class RecipeResolver {
  private readonly items: Recipe[] = createRecipeSamples();

  @Query(returns => Recipe, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<Recipe | undefined> {
    return await this.items.find(recipe => recipe.title === title);
  }

  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return await this.items;
  }
}
