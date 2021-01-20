import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import { ApolloServer } from "apollo-server-koa";

import { schema } from "./schema";
import { createContext } from "./context";

const app = new Koa();

const apollo = new ApolloServer({ schema, context: createContext });

app.use(helmet()).use(bodyParser()).use(apollo.getMiddleware());

export default app;
