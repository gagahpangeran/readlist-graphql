import { FindManyOptions, FindOneOptions, IsNull, Like, Not } from "typeorm";
import { ReadListArgs, ReadListFilter } from "../input/ReadListInput";
import ReadList from "../model/ReadList";

export function getFindOptions(args: ReadListArgs) {
  const { limit, skip, sort, filter } = args;

  const findOptions: FindManyOptions<ReadList> = {
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

  if (filter !== undefined) {
    findOptions.where = getFilterOptions(filter);
  }

  return findOptions;
}

function getFilterOptions(filter: ReadListFilter) {
  const { title, link, comment } = filter;
  const filterOptions: FindOneOptions<ReadList>["where"] = {};

  const titleKeyword = getKeyword(title?.contains);
  if (titleKeyword !== undefined) {
    filterOptions.title = titleKeyword;
  }

  const linkKeyword = getKeyword(link?.contains);
  if (linkKeyword !== undefined) {
    filterOptions.link = linkKeyword;
  }

  const commentKeyword = getKeyword(comment?.contains);
  const commentOptions = getWithNullOptions(comment?.isNull, commentKeyword);
  if (commentOptions !== undefined) {
    filterOptions.comment = commentOptions;
  }

  return filterOptions;
}

function getWithNullOptions<T>(isNull?: boolean, filterValue?: T) {
  switch (isNull) {
    case true:
      return IsNull();
    case false:
      if (filterValue === undefined) {
        return Not(IsNull());
      }
      return filterValue;
    case undefined:
    default:
      return filterValue;
  }
}

function getKeyword(keyword?: string) {
  if (keyword === undefined) {
    return undefined;
  }

  return Like(`%${keyword}%`);
}
