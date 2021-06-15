import { ApolloServer } from "apollo-server-lambda";
import { schema } from "./schema";
import { createContext } from "./context";

const apollo = new ApolloServer({ schema, context: createContext });

exports.graphqlHandler = apollo.createHandler();
