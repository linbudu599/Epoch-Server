import "reflect-metadata";
import Koa, { Context } from "koa";
import { ApolloServer } from "apollo-server-koa";
import { UserResolver } from "../resolver/userResolver";
import { ArticleResolver } from "../resolver/articleResolver";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { User } from "../schema/user";
import { Article } from "../schema/article";

import { buildSchema } from "type-graphql";

TypeORM.useContainer(Container);
async function initialize() {
  const connection = await TypeORM.createConnection({
    type: "mysql",
    database: "graphqlApi",
    username: "root",
    password: "111",
    port: 3306,
    host: "localhost",
    entities: [User, Article],
    // synchronize: true,
    logger: "advanced-console",
    logging: "all",
    // dropSchema: true,
    cache: true
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, ArticleResolver],
    container: Container
  });
  const server = new ApolloServer({
    context: async ({ req }: Context) => {},
    schema,
    tracing: true
  });

  // there is no router! just one url with various query schema
  const app = new Koa();
  // koa-mount works as well
  server.applyMiddleware({ app });

  app.listen({ port: 4003 }, () =>
    console.log(`Server ready at http://localhost:4002/graphql`)
  );
}

initialize();
