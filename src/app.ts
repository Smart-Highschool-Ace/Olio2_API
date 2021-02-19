import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import { ApolloServer } from "apollo-server-koa";

import { schema } from "./schema";
import { authToken } from "./middleware/authToken";
const app = new Koa();

const apollo = new ApolloServer({ schema });

app.use(helmet()).use(bodyParser()).use(apollo.getMiddleware()).use(authToken);

export default app;
