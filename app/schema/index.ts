import { gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    hello: String
    groups: [Group]
  }
  type Group {
    id: Int
    title: String
  }
`;

export default typeDefs;
