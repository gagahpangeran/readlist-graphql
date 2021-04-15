import { FindManyOptions } from "typeorm";
import { getConnection } from "../config/db";
import ReadList from "../model/ReadList";
import {
  ReadListArgs,
  ReadListInputData
} from "../resolver/input/ReadListInput";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(ReadList);
}

export async function getAllReadList(args: ReadListArgs) {
  const { limit, skip, sort, filter } = args;

  const findOptions: FindManyOptions<ReadList> = {
    select: ["id", "link", "title", "readAt", "comment"],
    skip,
    take: limit
  };

  if (sort !== undefined) {
    findOptions.order = sort.getSortOptions();
  }

  if (filter !== undefined) {
    findOptions.where = filter.getFilterOptions();
  }

  return await (await getRepo()).find(findOptions);
}

export async function addReadList(data: ReadListInputData) {
  return await (await getRepo()).save(data);
}

export async function editReadList(id: string, data: ReadListInputData) {
  return await (await getRepo()).save({ id, ...data });
}

export async function deleteReadLists(ids: string[]) {
  await (await getRepo()).softDelete(ids);
  return true;
}
