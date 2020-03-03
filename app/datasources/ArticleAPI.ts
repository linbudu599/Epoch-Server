import { DataSource } from "apollo-datasource";
import ArticleList from "../model/Article";

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

  async createArticle(
    type: string,
    title: string,
    description: string,
    content: string
  ) {
    // @ts-ignore
    const res = await this.store.create({
      type,
      title,
      description,
      content
    });
    // return this.reducer(res);
    return {
      msg: "success",
      status: 1,
      createdAt: res.created_at
    };
  }

  async deleteArticle(aid: number) {
    const res = await this.store.destroy({
      // @ts-ignore
      where: { aid }
    });
    console.log(res);
    return {
      msg: "success",
      status: 1,
      deletedAt: res.deleted_at
    };
  }

  async updateArticle(
    type: string,
    title: string,
    description: string,
    content: string
  ) {
    const res = await this.store.update({
      type,
      title,
      description,
      content
    });
    return {
      msg: "success",
      status: 1,
      updatedAt: res.created_at
    };
  }
}

export default ArticleListApi;
