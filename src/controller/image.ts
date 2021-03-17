import { Context } from "koa";
import { uploadToS3 } from "util/s3Image";

export const uploadImage = async (ctx: Context) => {
  ctx.assert(ctx.files, 400, "파일이 선택되지 않았습니다.");

  const filePath = ctx.files[0].path;

  const location = await uploadToS3(filePath);

  ctx.status = 200;
  ctx.body = {
    data: {
      location: location,
    },
  };
};
