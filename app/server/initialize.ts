import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { UserResolver } from "../resolver/userResolver";
import { MainResolver } from "../resolver/mainResolver";
import { ArticleResolver } from "../resolver/articleResolver";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { User } from "../schema/user";
import { Article } from "../schema/article";
import { Config } from "../schema/config";
import { buildSchema } from "type-graphql";

import { customAuthChecker } from "./authChecker";

TypeORM.useContainer(Container);

async function initialize() {
  await TypeORM.createConnection({
    type: "mysql",
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
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
    resolvers: [UserResolver, ArticleResolver, MainResolver],
    container: Container,
    authChecker: customAuthChecker
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const context = {
        req
      };
      return context;
    },
    tracing: true,
    engine: true
  });

  return server;
}

export default initialize;
