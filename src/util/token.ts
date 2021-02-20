import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
// dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY;

export const generateToken: Function = (payload: Object): String => {
  return jwt.sign(payload, jwtSecret);
};

export const verifyToken: Function = (token: string): Object => {
  return jwt.verify(token, jwtSecret);
};
