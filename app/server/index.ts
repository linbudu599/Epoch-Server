import Koa, { Context } from "koa";
import { ApolloServer } from "apollo-server-koa";
import typeDefs from "../schema";
import resolvers from "../resolver";
import ArticleListModel from "../model/Article";
import ArticleListApi from "../model/data-source";

const server = new ApolloServer({
  context: ({ req, res }: Context) => ({ user: "linbudu" }),
  typeDefs,
  resolvers,
  dataSources: () => ({
    // FIXME: fix type error, maybe by .d.ts
    // @ts-ignore
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
