import Koa from "koa";
import chalk from "chalk";
import initialize from "./initialize";
import dotenv from "dotenv";
import CrossOrigin from "../middleware/cors";
import "reflect-metadata";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
const dev = process.env.NODE_ENV === "development";

TypeORM.useContainer(Container);

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

async function start() {
  const server = await initialize();
  const app = new Koa();
  app.use(CrossOrigin);
  // koa-mount works as well
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(
      chalk.green(`🍀Server ready at http://localhost:${4000}/graphql`)
    )
  );
  // app.listen({ port: 4000 }, () =>
  //   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  // );
}

start();
