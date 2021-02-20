import { PrismaClient } from "@prisma/client";

import * as Joi from "joi";

import { generateToken } from "../util/token";
import { hashSha512 } from "../util/hash";

interface loginResult {
  token?: string;
  error?: string;
}

export const login: Function = async (
  userId: string,
  password: string
): Promise<loginResult> => {
  const bodyForm = Joi.object().keys({
    userId: Joi.string().email().required(),
    password: Joi.string().required(),
  }); //받는 값의 형식을 검사하는 구문

  if (bodyForm.validate({ userId, password }).error) {
    return {
      error: "에러, 잘못된 요청 또는 잘못된 값입니다.",
    };
  }

  const prisma = new PrismaClient();

  const hashedPassword = hashSha512(password);

  const user = await prisma.user.findFirst({
    where: {
      email: userId,
      password: hashedPassword,
    },
  });

  if (user) {
    // TDOO generatePayload 추가
    const payload = { userId: user.id };
    const token = { token: generateToken(payload) };
    return token;
  } else {
    return {
      error: "에러, 잘못된 요청 또는 잘못된 값입니다.",
    };
  }
};
