import "reflect-metadata";
import Koa, { Context } from "koa";
import { ApolloServer } from "apollo-server-koa";
// import typeDefs from "../schema";
import { RecipeResolver } from "../resolver/test";
import { UserResolver } from "../resolver/user";
import resolvers from "../resolver";
import ArticleModel from "../model/Article";
import ArticleAPI from "../datasources/ArticleAPI";

import UserModel from "../model/User";
import UserAPI from "../datasources/UserAPI";

import { buildSchema } from "type-graphql";

async function initialize() {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });
  const server = new ApolloServer({
    context: async ({ req }: Context) => {
      // ts-node cannot recongize ?. ????
      // const token = req.headers.authorization || "";
      // TODO: should get info from token (jwt)
      // I need to rethink the authorization
      const account = "linbudu";
      const pwd = "budubudu";
      // Apollo will inject data-sources automatically
      // @ts-ignore
      // const user = await store.users.findOne({
      //   where: {
      //     account,
      //     pwd
      //   }
      // });
      // console.log(user);
      // return { user: { ...user.dataValues } };
    },
    schema,
    // typeDefs,
    resolvers,
    dataSources: () => ({
      // FIXME: fix type error, maybe by .d.ts
      // @ts-ignore
      article: new ArticleAPI<any>(ArticleModel),
      // @ts-ignore
      users: new UserAPI<any>(UserModel)
    }),
    tracing: true
  });

  // there is no router! just one url with various query schema
  const app = new Koa();
  // koa-mount works as well
  server.applyMiddleware({ app });

  app.listen({ port: 4001 }, () =>
    console.log(`Server ready at http://localhost:4001/graphql`)
  );
}

initialize();
