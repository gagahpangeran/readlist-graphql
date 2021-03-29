import { getConnection } from "../config/db";
import Base from "../model/Base";
import ReadList from "../model/ReadList";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(ReadList);
}

type Data = Omit<ReadList, "id" | keyof Base>;

export async function getAllReadList() {
  return await (await getRepo()).find();
}

export async function addReadList(data: Data) {
  return await (await getRepo()).save(data);
}

export async function editReadList(id: string, data: Data) {
  return await (await getRepo()).save({ id, ...data });
}

export async function deleteReadLists(ids: string[]) {
  await (await getRepo()).softDelete(ids);
  return await getAllReadList();
}
