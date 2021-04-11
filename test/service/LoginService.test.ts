import jwt from "jsonwebtoken";
import { mocked } from "ts-jest/utils";
import { getConnectionManager } from "typeorm";
import { SECRET } from "../../src/config/const";
import * as configDB from "../../src/config/db";
import User from "../../src/model/User";
import { login } from "../../src/service/LoginService";
import { setupDB } from "../setup/db";
import { createUser } from "../setup/user";

jest.mock("../../src/config/db");

const configDBMock = mocked(configDB, true);

const USERNAME = "test";
const PASSWORD = "thisissecretpassword";

beforeEach(async () => {
  await setupDB();
  const conn = getConnectionManager().get("test");
  configDBMock.getConnection.mockImplementation(async () => conn);
  await createUser(USERNAME, PASSWORD);
  process.env.SECRET = SECRET;
});

afterEach(async () => {
  const conn = getConnectionManager().get("test");
  await conn.getRepository(User).delete({});
  return conn.close();
});

describe("Test for login service function", () => {
  it("should return the correct user and verified token", async () => {
    const token = (await login(USERNAME, PASSWORD)) ?? "";
    const result = jwt.verify(token, SECRET) as { username: string };

    expect(result.username).toBe(USERNAME);
  });

  it("should return undefined for non exist username", async () => {
    const result = await login("nottest", PASSWORD);
    expect(result).toBeUndefined();
  });

  it("should return undefined for wrong password", async () => {
    const result = await login(USERNAME, "pass");
    expect(result).toBeUndefined();
  });
});
