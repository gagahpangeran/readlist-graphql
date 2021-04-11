import bcrypt from "bcryptjs";
import { getConnectionManager } from "typeorm";
import User from "../../src/model/User";

export async function createUser(username: string, password: string) {
  const salt = await bcrypt.genSalt(7);
  const hashPassword = await bcrypt.hash(password, salt);

  const conn = getConnectionManager().get("test");
  conn.getRepository(User).save({ username, password: hashPassword });
}
