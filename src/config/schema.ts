import { buildSchema } from "type-graphql";
import ReadListResolver from "../resolver/ReadListResolver";

export async function createSchema() {
  return await buildSchema({ resolvers: [ReadListResolver] });
}
