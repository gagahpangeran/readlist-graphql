import { FindManyOptions, IsNull, Like, Not } from "typeorm";
import { ReadListArgs } from "../input/ReadListInput";
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
    const { title, link, comment } = filter;

    const titleKeyword = getKeyword(title?.contains);
    const linkKeyword = getKeyword(link?.contains);

    findOptions.where = {
      title: titleKeyword,
      link: linkKeyword,
      comment: getCommentOptions(comment?.isNull, comment?.contains)
    };
  }

  return findOptions;
}

function getCommentOptions(isNull?: boolean, keyword?: string) {
  switch (isNull) {
    case true:
      return IsNull();
    case false:
      if (keyword === undefined) {
        return Not(IsNull());
      }
      return Like(`%${keyword}`);
    case undefined:
    default:
      return getKeyword(keyword);
  }
}

function getKeyword(keyword?: string) {
  if (keyword === undefined) {
    return undefined;
  }

  return Like(`%${keyword}%`);
}
