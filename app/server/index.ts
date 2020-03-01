import Koa, { Context } from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "../schema";
import resolvers from "../resolver";
import ArticleListModel from "../model";
import ArticleListApi from "../model/data-source";

const server = new ApolloServer({
  context: ({ req, res }: Context) => ({}),
  typeDefs,
  resolvers,
  dataSources: () => ({
    articleList: new ArticleListApi<any>(ArticleListModel)
  })
});

// there is no router! just one url with various query schema
const app = new Koa();
// koa-mount works as well
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001/graphql`)
);
