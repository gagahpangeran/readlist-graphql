import { AuthenticationError } from "apollo-server-errors";
import { Arg, Mutation, Resolver } from "type-graphql";
import { login } from "../service/LoginService";

@Resolver()
export default class LoginResolver {
  @Mutation(_returns => String)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const token = await login(username, password);
    if (token === undefined) {
      throw new AuthenticationError("Invalid username or password!");
    }

    return token;
  }
}
