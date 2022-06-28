import { sign, verify, JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY || "asfsdafasfd";

export const generateAccessToken: Function = (payload: {
  email: string;
  userId: number;
  name: string;
}): String => sign(payload, jwtSecret, { expiresIn: "7d" });

export const generateToken: Function = (payload: Object): String => {
  return sign(payload, jwtSecret, {
    expiresIn: "7d", // 만료일 7일
  });
};

export const verifyToken: Function = (token: string): JwtPayload | string => {
  return verify(token, jwtSecret);
};

export const generateRandomString: Function = () =>
  [...Array(16)].map((_) => (~~(Math.random() * 36)).toString(36)).join("");
