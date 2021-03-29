import {
  Arg,
  Args,
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import ReadList from "../model/ReadList";
import {
  addReadList,
  deleteReadLists,
  editReadList,
  getAllReadList,
  ReadListServiceArgs
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

@ArgsType()
class ReadListArgs implements ReadListServiceArgs {
  @Field(_type => Int, { defaultValue: 10 })
  limit!: number;

  @Field(_type => Int, { defaultValue: 0 })
  skip!: number;
}

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
