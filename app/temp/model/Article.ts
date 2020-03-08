import { Model, DataTypes } from "sequelize";

import sequelize from "./index";

class ArticleList extends Model {
  aid!: number;
  type!: number;
  tag!: number;
  title!: number;
  content!: string;
  auth!: number;

  static async globalMethod(): Promise<any> {
    return Promise.resolve("Gotcha!");
  }
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
    description: {
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

// fill initial data
// (async () => {
//   await ArticleList.sync();
//   for (let i = 0; i < 10; i++) {
//     const res = await ArticleList.create(
//       {
//         type: "FrontEnd",
//         tag: "React",
//         title: "深入React Hooks原理",
//         description: "Guess",
//         content: "整挺好！"
//       },
//       {
//         benchmark: true
//       }
//     );
//   }
//   // console.log(res);
// })();
export default ArticleList;
