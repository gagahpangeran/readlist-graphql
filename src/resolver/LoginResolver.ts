import { AuthenticationError } from "apollo-server-errors";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { login } from "../service/LoginService";

@ObjectType()
class Auth {
  @Field({ nullable: true })
  token!: string;

  @Field({ nullable: true })
  username!: string;
}

@Resolver()
export default class LoginResolver {
  @Mutation(_returns => Auth)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ) {
    const token = await login(username, password);
    if (token === undefined) {
      throw new AuthenticationError("Invalid username or password!");
    }

    const authToken: Auth = { token, username };
    return authToken;
  }
}
