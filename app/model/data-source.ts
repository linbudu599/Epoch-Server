import { DataSource } from "apollo-datasource";
import ArticleList from "./Article";

class ArticleListApi<T> extends DataSource {
  // TODO: read the docs to get correct type
  store: ArticleList;
  context: any;
  constructor(database: ArticleList) {
    super();
    this.store = database;
  }

  initialize(config: any) {
    this.context = config.context;
  }

  // reducer should be flexible
  reducer({
    aid,
    type,
    tag,
    title,
    description,
    content,
    created_at,
    updated_at
  }: any) {
    // console.log(aid, type, tag, title, description, content);
    return {
      aid,
      type,
      tag,
      title,
      description,
      content,
      createdAt: created_at,
      updatedAt: updated_at
    };
  }

  async getAllArticleList() {
    // @ts-ignore
    const res = await this.store.findAll();
    // should be IArticle, but nodemon cannot recongize it
    return res.map((item: any) => this.reducer(item));
  }

  async getArticleByAid(aid: number) {
    // @ts-ignore
    const res = await this.store.findOne({
      where: { aid }
    });
    // console.log(res);
    return this.reducer(res);
  }
}

export default ArticleListApi;
