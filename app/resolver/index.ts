const resolvers = {
  Query: {
    hello: () => "Hello world!",
    groups: () => [
      { id: 1, title: "1" },
      { id: 2, title: "2" }
    ],
    // FIXME: how to define types?
    articleList: async (_: any, {}: any, { dataSources }: any) => {
      const articleList = await dataSources.articleList.getAllArticleList();
      return articleList;
    },
    getArticleByAid: async (
      _: any,
      { aid }: { aid: number },
      { dataSources }: any
    ) => {
      const articleInfo = await dataSources.articleList.getArticleByAid(aid);
      return articleInfo;
    }
  }
};

export default resolvers;
