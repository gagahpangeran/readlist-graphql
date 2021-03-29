import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import { ReadListArgs, ReadListInput } from "../input/ReadListInput";
import ReadList from "../model/ReadList";
import {
  addReadList,
  deleteReadLists,
  editReadList,
  getAllReadList
} from "../service/ReadListService";

@Resolver(_of => ReadList)
export default class ReadListResolver {
  @Query(_returns => [ReadList])
  async allReadLists(@Args() args: ReadListArgs) {
    return await getAllReadList(args);
  }

  @Mutation(_returns => ReadList)
  addReadList(@Arg("data") readListData: ReadListInput) {
    return addReadList(readListData);
  }

  @Mutation(_returns => ReadList)
  editReadList(
    @Arg("id", _type => ID) id: string,
    @Arg("data") readListData: ReadListInput
  ) {
    return editReadList(id, readListData);
  }

  @Mutation(_returns => [ReadList])
  deleteReadLists(
    @Arg("ids", _type => [ID]) ids: string[],
    @Args() args: ReadListArgs
  ) {
    return deleteReadLists(ids, args);
  }
}
