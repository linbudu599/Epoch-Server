import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-koa";
import { UserResolver } from "../resolver/userResolver";
import { MainResolver } from "../resolver/mainResolver";
import { ArticleResolver } from "../resolver/articleResolver";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { User } from "../schema/user";
import { Article } from "../schema/article";
import { Config } from "../schema/config";
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

  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => "Hello world!"
    }
  };

  const schema = await buildSchema({
    resolvers: [UserResolver, ArticleResolver, MainResolver],
    container: Container
  });
  const server = new ApolloServer({
    schema,
    tracing: true,
    typeDefs,
    resolvers,
    engine: true
  });

  return server;
}

export default initialize;
