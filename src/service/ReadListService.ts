import { FindManyOptions, IsNull, Not } from "typeorm";
import { getConnection } from "../config/db";
import { ReadListArgs } from "../input/ReadListInput";
import Base from "../model/Base";
import ReadList from "../model/ReadList";

async function getRepo() {
  const conn = await getConnection();
  return conn.getRepository(ReadList);
}

type Data = Omit<ReadList, "id" | keyof Base>;

export async function getAllReadList(args: ReadListArgs) {
  const { limit, skip, sort } = args;

  const findOptions: FindManyOptions<ReadList> = {
    where: {
      readAt: Not(IsNull())
    },
    skip,
    take: limit
  };

  if (sort !== undefined) {
    const { fields, order } = sort;

    findOptions.order = {
      [fields]: order,
      createdAt: order
    };
  }

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
