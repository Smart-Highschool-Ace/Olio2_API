import { ApolloServer } from "apollo-server-lambda/dist";
import { schema } from "./src/schema";
import { createContext } from "./src/middleware/context";

const STAGE = process.env.STAGE || "dev";
const DEBUG = STAGE == "dev" ? true : false;

const graphqlHandler = new ApolloServer({
  schema,
  context: createContext,
  debug: DEBUG,
}).createHandler({});

export { graphqlHandler };
