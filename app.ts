import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./src/schema";
import { createContext } from "./src/context";

const apollo = new ApolloServer({
  schema,
  context: createContext,
  playground: {
    endpoint: `/${process.env.STAGE || "dev"}/graphql`,
  },
});

exports.graphqlHandler = apollo.createHandler();
