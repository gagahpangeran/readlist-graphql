import { mocked } from "ts-jest/utils";
import { getConnectionManager } from "typeorm";
import * as configDB from "../../src/config/db";
import ReadList from "../../src/model/ReadList";
import { addReadList, getAllReadList } from "../../src/service/ReadListService";
import { setupDB } from "../setup/db";

jest.mock("../../src/config/db");

const configDBMock = mocked(configDB, true);

const mockReadList = {
  link: "http://test.com",
  title: "Test",
  readAt: new Date(),
  comment: "test"
};

beforeEach(async () => {
  await setupDB();
  const conn = getConnectionManager().get("test");
  configDBMock.getConnection.mockImplementation(async () => conn);
  await conn.getRepository(ReadList).save({ ...mockReadList });
});

afterEach(async () => {
  const conn = getConnectionManager().get("test");
  await conn.getRepository(ReadList).delete({});
  return conn.close();
});

describe("Get all read lists from database", () => {
  it("Should return correct array of read list", async () => {
    const result = await getAllReadList({
      skip: 0,
      limit: 5,
      sort: undefined,
      filter: undefined
    });

    expect(result).toMatchObject([mockReadList]);
  });
});

describe("Add new read lists to database", () => {
  it("Should return correct read list after add", async () => {
    const mockNewReadList = { link: "http://new.com", title: "New" };

    const result = await addReadList(mockNewReadList);
    expect(result).toMatchObject(mockNewReadList);
  });
});
