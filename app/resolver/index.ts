import ArticleList from "../model/Article";

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    groups: () => [
      { id: 1, title: "1" },
      { id: 2, title: "2" }
    ]
  }
};

export default resolvers;
