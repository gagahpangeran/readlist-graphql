import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { getConnection } from "../config/db";
import User from "../model/User";

dotenv.config();

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(User);
}

export async function login(username: string, password: string) {
  const user = await (await getRepo()).findOne({ where: { username } });
  if (user === undefined) {
    return undefined;
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return undefined;
  }

  return jwt.sign({ username }, process.env.SECRET ?? "secret");
}
