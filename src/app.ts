import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import * as cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";

import { schema } from "./schema";
import { createContext } from "./context";
import router from "./router";

const app = new Koa();

const apollo = new ApolloServer({ schema, context: createContext });

app.proxy = true;
app
  .use(cors())
  .use(helmet({ contentSecurityPolicy: false }))
  .use(bodyParser())
  .use(apollo.getMiddleware())
  .use(router.routes())
  .use(router.allowedMethods());
export default app;
