import { Model, DataTypes } from "sequelize";

import sequelize from "./index";

class User extends Model {
  uid!: number;
  auth!: number;
  account!: string;
  pwd!: string;

  static async globalMethod(): Promise<any> {
    return Promise.resolve("Gotcha!");
  }
}

User.init(
  {
    uid: {
      type: new DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      comment: "id"
    },
    auth: {
      type: new DataTypes.INTEGER(),
      defaultValue: 1
    },
    account: {
      type: new DataTypes.STRING(64)
    },
    pwd: {
      type: new DataTypes.STRING(64)
    }
  },
  {
    tableName: "user",
    sequelize: sequelize
  }
);

export default User;
