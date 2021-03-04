import { Context } from "koa";
import asyncBusboy = require("async-busboy");

export const fileParser = async (ctx: Context, next: Function) => {
  ctx.assert(
    ctx.header["content-length"] < 4 * 1024 * 1024,
    400,
    "파일 크기 제한은 4MB입니다."
  );

  const { files } = await asyncBusboy(ctx.req);

  ctx.files = files;

  await next();
};
