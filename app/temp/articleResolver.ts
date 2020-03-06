const articleResolver = {
  // Query
  articleList: async (
    _: any,
    { cursor, count }: { [x: string]: number },
    { dataSources }: any
  ) => {
    const articleList = await dataSources.article.getAllArticleList(
      cursor,
      count
    );
    console.log(articleList);
    return articleList;
  },
  getArticleByAid: async (
    _: any,
    { aid }: { aid: number },
    { dataSources }: any
  ) => {
    const articleInfo = await dataSources.article.getArticleByAid(aid);
    return articleInfo;
  },
  // Mutation
  createArticle: async (
    _: any,
    { type, title, description, content }: { [x: string]: string },
    { dataSources }: any
  ) => {
    return await dataSources.article.createArticle(
      type,
      title,
      description,
      content
    );
  },

  deleteArticle: async (
    _: any,
    { type, title, description, content }: { [x: string]: string },
    { dataSources }: any
  ) => {
    return await dataSources.article.deleteArticle({
      type,
      title,
      description,
      content
    });
  },

  updateArticle: async (
    _: any,
    { type, title, description, content }: { [x: string]: string },
    { dataSources }: any
  ) => {
    return await dataSources.article.updateArticle({
      type,
      title,
      description,
      content
    });
  }
};

export default articleResolver;
