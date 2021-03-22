import * as koaRouter from "koa-router";
import { ImageController } from "controller";
import { fileParser } from "middleware";

const router = new koaRouter();

router.post("/image", fileParser, ImageController.uploadImage);

export default router;
