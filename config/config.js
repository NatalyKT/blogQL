// require("dotenv").config();
import "dotenv/config";
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

export default {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "db_blogQL_dev",
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "db_blogQL_test",
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: "db_blogQL_prod",
    host: DB_HOST,
    dialect: "postgres",
  },
};
