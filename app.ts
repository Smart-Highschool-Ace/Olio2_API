import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./src/schema";
import { createContext } from "./src/middleware/context";

const STAGE = process.env.STAGE || "dev";
const DEBUG = STAGE == "dev" ? true : false;

const apollo = new ApolloServer({
  schema,
  context: createContext,
  playground: {
    endpoint: `/${STAGE}/graphql`,
  },
  debug: DEBUG,
});

exports.graphqlHandler = apollo.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
