import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import ReadList from "./graphql/model/ReadList";

dotenv.config();

const connectionOptions: ConnectionOptions = {
  name: "default",
  type: "mysql",
  port: 3306,
  synchronize: true,
  logging: true,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ReadList]
};

export default connectionOptions;