import Sequelize from "sequelize";
import config from "../config/mysqlConfig.js";
import initModel from "./index.js";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = initModel(sequelize);
export { db, sequelize };
