import { ConnectionOptions } from "typeorm";
import migrations from "./migrations";
import * as env from "./src/config/const";
import ReadList from "./src/model/ReadList";
import User from "./src/model/User";

const connectionOptions: ConnectionOptions = {
  name: "default",
  type: "mysql",
  port: 3306,
  logging: true,
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, ReadList],
  migrations
};

export default connectionOptions;
