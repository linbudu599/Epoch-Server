import "reflect-metadata";
import { Context } from "koa";
import { ApolloServer } from "apollo-server-koa";
import { UserResolver } from "../resolver/userResolver";
import { MainResolver } from "../resolver/mainResolver";
import { ArticleResolver } from "../resolver/articleResolver";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { User } from "../schema/user";
import { Article } from "../schema/article";
import { buildSchema } from "type-graphql";
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
    container: Container
  });
  const server = new ApolloServer({
    // context: ({ req }: Context) => {
    //   const context = {
    //     req,
    //     auth: req.headers.authorization
    //   };
    //   return context;
    // },
    schema,
    tracing: true
  });

  return server;
}

export default initialize;
