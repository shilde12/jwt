import { Sequelize } from "sequelize";

const sequelize = new Sequelize("cadastro", "root", "1234", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export { sequelize };