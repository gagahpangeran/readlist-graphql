import { AuthenticationError } from "apollo-server-lambda";
import jwt from "jsonwebtoken";
import { AuthChecker, buildSchema } from "type-graphql";
import LoginResolver from "../resolver/LoginResolver";
import ReadListResolver from "../resolver/ReadListResolver";
import { SECRET } from "./const";

export async function createSchema() {
  return await buildSchema({
    resolvers: [LoginResolver, ReadListResolver],
    authChecker
  });
}

const authChecker: AuthChecker<{ bearerToken?: string }> = ({
  context: { bearerToken }
}) => {
  if (bearerToken === undefined) {
    return false;
  }

  const [type, token] = bearerToken.split(" ");

  if (type !== "Bearer") {
    throw new AuthenticationError("Invalide auth type");
  }

  try {
    jwt.verify(token, SECRET);
  } catch (err) {
    throw new AuthenticationError("Invalid token");
  }

  return true;
};
