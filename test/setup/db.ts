import { createConnection } from "typeorm";
import ReadList from "../../src/model/ReadList";
import User from "../../src/model/User";

export async function setupDB() {
  await createConnection({
    name: "test",
    type: "sqljs",
    entities: [ReadList, User],
    synchronize: true,
    logging: false
  });
}
