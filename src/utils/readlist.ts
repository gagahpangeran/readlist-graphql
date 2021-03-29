import { FindManyOptions } from "typeorm";
import { ReadListArgs } from "../input/ReadListInput";
import ReadList from "../model/ReadList";

export function getFindOptions(args: ReadListArgs) {
  const { limit, skip, sort, filter } = args;

  const findOptions: FindManyOptions<ReadList> = {
    skip,
    take: limit
  };

  if (sort !== undefined) {
    findOptions.order = sort.getSortOptions();
  }

  if (filter !== undefined) {
    findOptions.where = filter.getFilterOptions();
  }

  return findOptions;
}
