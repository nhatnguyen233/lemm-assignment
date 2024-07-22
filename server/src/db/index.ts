import { Sequelize } from "sequelize";
import { config } from "../config";

const dbConfig = config.DB_CONFIG;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  username: dbConfig.user,
  password: dbConfig.password,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;
