import * as fs from "fs";
import * as crypto from "crypto";
import * as AWS from "aws-sdk";

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3bucket = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  params: { Bucket: bucketName },
});

export const uploadToS3: Function = async (fileName: string) => {
  const readStream = fs.createReadStream(fileName);

  // 올해 년도로 폴더 지정
  const today = new Date();
  const year = String(today.getFullYear());

  // 랜덤 키를 사용하여 파일 이름 생성
  const randomKey = () => {
    return crypto.randomBytes(20).toString("hex");
  };

  let key = randomKey();

  while (await getImage(key)) {
    key = randomKey();
  }

  // 올해년도 폴더 안에 key의 이름을 가진 파일로 저장
  const params = {
    Bucket: bucketName,
    Key: year + "/" + key,
    Body: readStream,
  };

  const upload = await s3bucket.upload(params).promise();

  return upload.Location;
};

// 중복확인을 위한 이미지 불러오기
export const getImage = async (key: string) => {
  try {
    const file: any = s3bucket
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
