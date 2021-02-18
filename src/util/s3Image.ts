import * as fs from "fs";
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

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: readStream,
  };

  const upload = await s3bucket.upload(params).promise();

  return upload.Location;
};
