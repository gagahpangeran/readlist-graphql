import bcrypt from "bcryptjs";
import { getConnection } from "../config/db";
import User from "../model/User";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(User);
}

export async function login(username: string, password: string) {
  const user = await (await getRepo()).findOne({ where: { username } });

  if (user === undefined) {
    return false;
  }

  return await bcrypt.compare(password, user.password);
}
