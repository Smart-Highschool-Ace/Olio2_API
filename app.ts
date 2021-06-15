import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./src/schema";
import { createContext } from "./src/context";

const apollo = new ApolloServer({ schema, context: createContext });

exports.graphqlHandler = apollo.createHandler();
