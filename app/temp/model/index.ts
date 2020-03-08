import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root:111@localhost:3306/graphqlApi", {
  dialect: "mysql",
  timezone: "+08:00",
  logging: console.log,
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    freezeTableName: true,
    scopes: {
      timeInfo: {
        attributes: {
          exclude: ["updated_at", "deleted_at", "created_at"]
        }
      }
    }
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
