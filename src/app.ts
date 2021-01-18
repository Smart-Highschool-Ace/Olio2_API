import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";

const app = new Koa();

app.use(helmet()).use(bodyParser());

export default app;
