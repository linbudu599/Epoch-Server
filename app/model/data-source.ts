import { DataSource } from "apollo-datasource";

class ArticleListApi<T> extends DataSource {
  // TODO: read the docs to get correct type
  store: T;
  context: any;
  constructor(database: T) {
    super();
    this.store = database;
  }

  initialize(config: any) {
    this.context = config.context;
  }
}

export default ArticleListApi;
