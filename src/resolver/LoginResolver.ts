import { Arg, Mutation, Resolver } from "type-graphql";
import { login } from "../service/LoginService";

@Resolver()
export default class LoginResolver {
  @Mutation(_returns => Boolean)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    return await login(username, password);
  }
}
