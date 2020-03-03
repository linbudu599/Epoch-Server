import { gql } from "apollo-server-koa";

// TODO: union interface(__resolverType) directives

const typeDefs = gql`
  type Query {
    hello: String!
    groups: [Group]
    articleList: [Article!]!
    getArticleByAid(aid: Int!): Article!
    login(account: String, pwd: String): LoginStatus!
  }

  type LoginStatus implements AccountStatus {
    status: Int!
    token: String
  }

  interface AccountStatus {
    status: Int!
    token: String
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

  type ArticleStatus {
    msg: String!
    status: Int!
    createdAt: String
    deletedAt: String
    updatedAt: String
  }

  type RegisterStatus implements AccountStatus {
    status: Int!
    token: String
    usersCount: Int!
  }

  type Mutation {
    register(account: String!, pwd: String!): RegisterStatus!
    destroyAccount: LoginStatus!
    # Mutation On Article Series
    createArticle(
      type: String
      title: String
      description: String
      content: String
    ): ArticleStatus!
    deleteArticle(aid: Int!): ArticleStatus!
    # TODO: toggle article visible
    updateArticle(
      type: String
      title: String
      description: String
      content: String
    ): ArticleStatus!
  }
`;

export default typeDefs;
