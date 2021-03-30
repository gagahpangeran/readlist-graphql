import { buildSchema } from "type-graphql";
import LoginResolver from "../resolver/LoginResolver";
import ReadListResolver from "../resolver/ReadListResolver";

export async function createSchema() {
  return await buildSchema({ resolvers: [LoginResolver, ReadListResolver] });
}
