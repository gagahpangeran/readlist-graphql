import {
  Arg,
  Args,
  Authorized,
  ID,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import ReadList from "../model/ReadList";
import {
  addReadList,
  deleteReadLists,
  editReadList,
  getAllReadList
} from "../service/ReadListService";
import { ReadListArgs, ReadListInput } from "./input/ReadListInput";

@Resolver(_of => ReadList)
export default class ReadListResolver {
  @Query(_returns => [ReadList])
  allReadLists(@Args() args: ReadListArgs) {
    return getAllReadList(args);
  }

  @Authorized()
  @Mutation(_returns => ReadList)
  addReadList(@Arg("data") readListData: ReadListInput) {
    return addReadList(readListData.cleanInput);
  }

  @Authorized()
  @Mutation(_returns => ReadList)
  editReadList(
    @Arg("id", _type => ID) id: number,
    @Arg("data") readListData: ReadListInput
  ) {
    return editReadList(id, readListData.cleanInput);
  }

  @Authorized()
  @Mutation(_returns => Boolean)
  deleteReadLists(@Arg("ids", _type => [ID]) ids: number[]) {
    return deleteReadLists(ids);
  }
}
