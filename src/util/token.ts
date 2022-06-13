import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
// dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "asfsdafasfd";

export const generateAccessToken: Function = (payload: {
  email: string;
  id: number;
  name: string;
}): String => jwt.sign(payload, jwtSecret, { expiresIn: "7d" });

export const generateToken: Function = (payload: Object): String => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "7d", // 만료일 7일
  });
};

export const verifyToken: Function = (
  token: string,
): jwt.JwtPayload | string => {
  return jwt.verify(token, jwtSecret);
};
