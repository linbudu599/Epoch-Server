import userResolver from "./userResolver";
import articleResolver from "./articleResolver";

const { login, register, destroyAccount } = userResolver;
const {
  articleList,
  getArticleByAid,
  createArticle,
  updateArticle,
  deleteArticle
} = articleResolver;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    groups: () => [
      { id: 1, title: "1" },
      { id: 2, title: "2" }
    ],
    // FIXME: how to define types?
    articleList,
    getArticleByAid,
    
    login
  },

  Mutation: {
    register,
    destroyAccount,

    createArticle,
    deleteArticle,
    updateArticle
  }
};

export default resolvers;
