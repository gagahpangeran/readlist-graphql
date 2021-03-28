import {
  Arg,
  Field,
  ID,
  InputType,
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

@InputType()
class ReadListInput implements Partial<ReadList> {
  @Field()
  link!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  readAt?: Date;

  @Field({ nullable: true })
  comment?: string;
}
@Resolver(_of => ReadList)
export default class ReadListResolver {
  @Query(_returns => [ReadList])
  async allReadLists() {
    return await getAllReadList();
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
  deleteReadLists(@Arg("ids", _type => [ID]) ids: string[]) {
    return deleteReadLists(ids);
  }
}
