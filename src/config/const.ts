import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  DB_HOST = "localhost",
  DB_USERNAME = "user",
  DB_PASSWORD = "password",
  DB_NAME = "readlist",
  SECRET = "secret"
} = process.env;

export { NODE_ENV, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, SECRET };
