import * as crypto from "crypto";

// import * as dotenv from "dotenv";
// dotenv.config();

const salt = process.env.SALT || "Asdfasfdasf";

export const hashSha512: Function = (password: string): String => {
  return crypto.createHmac("sha512", salt).update(password).digest("base64");
};
