import Koa from "koa";
import chalk from "chalk";
import initialize from "./initialize";
import dotenv from "dotenv";

const dev = process.env.NODE_ENV === "development";

dotenv.config({ path: dev ? ".env.dev" : ".env.prod" });

async function start() {
  const server = await initialize();
  const app = new Koa();
  // koa-mount works as well
  server.applyMiddleware({ app });

  app.listen({ port: 4015 }, () =>
    console.log(
      chalk.green(
        `🍀Server ready at http://localhost:${process.env.PORT}/graphql`
      )
    )
  );
}

start();
