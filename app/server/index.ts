import Koa, { Context, Next } from "koa";
import { ApolloServer, gql } from "apollo-server-koa";
import typeDefs from "../schema";
import resolvers from "../resolver";

const server = new ApolloServer({
  context: ({ req, res }: Context) => ({}),
  typeDefs,
  resolvers
});

// there is no router! just one url with query schema
const app = new Koa();
// koa-mount works as well
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001/graphql`)
);
