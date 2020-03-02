interface IArticle {
  aid: number;
  type: string;
  tag: string;
  title: string;
  description: string;
  content: string;
  auth: number;
  createdAt: string;
  updatedAt: string;
}

type Article = Partial<IArticle>;

interface IResolver {
  _: any;
  dataSources: any;
  [x: string]: any;
}
