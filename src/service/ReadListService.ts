import { getConnection } from "../config/db";
import { ReadListArgs } from "../input/ReadListInput";
import Base from "../model/Base";
import ReadList from "../model/ReadList";
import { getFindOptions } from "../utils/readlist";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(ReadList);
}

type Data = Omit<ReadList, "id" | keyof Base>;

export async function getAllReadList(args: ReadListArgs) {
  const findOptions = getFindOptions(args);
  return await (await getRepo()).find(findOptions);
}

export async function addReadList(data: Data) {
  return await (await getRepo()).save(data);
}

export async function editReadList(id: string, data: Data) {
  return await (await getRepo()).save({ id, ...data });
}

export async function deleteReadLists(ids: string[]) {
  await (await getRepo()).softDelete(ids);
  return true;
}
