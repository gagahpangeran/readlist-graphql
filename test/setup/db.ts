import { createConnection } from "typeorm";
import ReadList from "../../src/model/ReadList";

export async function setupDB() {
  await createConnection({
    name: "test",
    type: "sqljs",
    entities: [ReadList],
    synchronize: true,
    logging: false
  });
}
