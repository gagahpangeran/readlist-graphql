import { ApolloServer } from "apollo-server-lambda";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context
} from "aws-lambda";
import "reflect-metadata";
import { ALLOWED_HOSTS } from "../config/const";
import { createSchema } from "../config/schema";

const createHandler = async () => {
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    context: ({ event }: { event: APIGatewayProxyEvent }) => ({
      bearerToken: event.headers?.["authorization"]
    })
  });

  return server.createHandler({
    cors: {
      origin: ALLOWED_HOSTS,
      credentials: true
    }
  });
};

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback?: Callback<APIGatewayProxyResult>
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  createHandler().then(handler => {
    handler(event, context, callback);
  });
};
