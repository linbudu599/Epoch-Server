import { Model, DataTypes } from "sequelize";

import sequelize from "./index";

class ArticleList extends Model {
  aid!: number;
  type!: number;
  tag!: number;
  title!: number;
  content!: string;
  auth!: number;
}

ArticleList.init(
  {
    aid: {
      type: new DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      comment: "id"
    },
    type: {
      type: new DataTypes.STRING(16)
    },
    tag: {
      type: new DataTypes.STRING(64)
    },
    title: {
      type: new DataTypes.STRING(64)
    },
    content: {
      type: new DataTypes.STRING()
    },
    auth: {
      type: new DataTypes.INTEGER(),
      defaultValue: 10
    }
  },
  {
    tableName: "ArticleList",
    sequelize: sequelize
  }
);



export default ArticleList;
