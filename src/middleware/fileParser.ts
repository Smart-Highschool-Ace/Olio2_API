import { Context } from "koa";
import asyncBusboy = require("async-busboy");

export const fileParser = async (ctx: Context, next: Function) => {
  const { files } = await asyncBusboy(ctx.req);
  ctx.files = files;

  await next();
};
