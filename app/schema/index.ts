import { gql } from "apollo-server-koa";

// TODO: union interface(__resolverType) directives

const typeDefs = gql`
  type Query {
    hello: String!
    groups: [Group]
    articleList: [Article!]!
    getArticleByAid(aid: Int!): Article!
  }
  type Group {
    id: Int
    title: String
  }

  # FIXME: __resolverType
  type Article implements ArticleBasic @cacheControl(maxAge: 240) {
    aid: Int!
    type: String!
    tag: String!
    title: String!
    description: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  interface ArticleBasic {
    aid: Int!
    title: String!
    description: String!
    content: String!
  }
`;

export default typeDefs;
