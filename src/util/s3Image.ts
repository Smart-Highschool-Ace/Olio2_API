import * as fs from "fs";
import * as crypto from "crypto";
import * as AWS from "aws-sdk";

const s3bucket: AWS.S3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  params: { Bucket: process.env.AWS_BUCKET_NAME },
});

type ImageUpload = {
  Bucket: string;
  Key: string;
  Body: fs.ReadStream;
  ACL: string;
};
export const uploadToS3: Function = async (
  fileName: string
): Promise<string> => {
  const readStream = fs.createReadStream(fileName);

  // 올해 년도로 폴더 지정
  const today = new Date();
  const year = String(today.getFullYear());

  // 랜덤 키를 사용하여 파일 이름 생성
  const randomKey: Function = (): String => {
    return crypto.randomBytes(20).toString("hex");
  };

  let key = randomKey();

  while (await getImage(key)) {
    key = randomKey();
  }

  // 올해년도 폴더 안에 key의 이름을 가진 파일로 저장
  const params: ImageUpload = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: year + "/" + key,
    Body: readStream,
    ACL: "public-read",
  };

  const upload: AWS.S3.ManagedUpload.SendData = await s3bucket
    .upload(params)
    .promise();

  return upload.Location;
};

// 중복확인을 위한 이미지 불러오기
export const getImage = async (key: string) => {
  try {
    const file = s3bucket
      .getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();

    return await file;
  } catch {
    return;
  }
};
