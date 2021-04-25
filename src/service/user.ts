import { PrismaClient } from "@prisma/client";

import * as Joi from "joi";

import { generateToken } from "../util/token";
import { hashSha512 } from "../util/hash";
import { UserCreateArgs, UserUpdateArgs } from "interface/User";

interface loginResult {
  token?: string;
  error?: string;
}

export const login: Function = async (
  email: string,
  password: string
): Promise<loginResult> => {
  const bodyForm = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }); //받는 값의 형식을 검사하는 구문

  if (bodyForm.validate({ email, password }).error) {
    return {
      error: "에러, 잘못된 요청 또는 잘못된 값입니다.",
    };
  }

  const prisma = new PrismaClient();

  const hashedPassword = hashSha512(password);
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: hashedPassword,
    },
  });
  if (user) {
    const payload = { userId: user.id };
    const token = { token: generateToken(payload) };
    return token;
  } else {
    return {
      error: "에러, 잘못된 요청 또는 잘못된 값입니다.",
    };
  }
};

export const checkEmail: Function = async (email: string) => {
  const prisma = new PrismaClient();
  // 1. 중복 이메일일경우
  const isDuplicate = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (isDuplicate) {
    return {
      status: false,
      error: "에러 , 이미 등록된 이메일입니다.",
    };
  }
  // 이메일 형식이 아닐 경우
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (!re.test(email)) {
    // 이메일 형식 확인 정규표현식
    return {
      status: false,
      error: "에러, 이메일 형식이 유효하지 않습니다.",
    };
  }
  // 학교 계정이 아닐 경우
  if (email.slice(-10) !== "@gsm.hs.kr") {
    return {
      status: false,
      error:
        "에러, 광주소프트웨어마이스터고등학교에서 발급한 학교 이메일이어야 합니다.",
    };
  }

  return { status: true };
};

export const createUser: Function = async (data: UserCreateArgs) => {
  const prisma = new PrismaClient();
  const user = data.user;
  const hashedPassword = hashSha512(user.password);
  return await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      school: user.school,
      name: user.name,
      entrance_year: user.entrance_year,
      profile_image: user.profile_image,
      introduction: user.introduction,
    },
  });
};

export const updateUser: Function = async (
  user_id: number,
  data: UserUpdateArgs
) => {
  const prisma = new PrismaClient();
  const user = data.user;
  return await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: user.name,
      school: user.school,
      profile_image: user.profile_image,
      introduction: user.introduction,
    },
  });
};

export const deleteUser: Function = async (user_id: number) => {
  const prisma = new PrismaClient();

  return await prisma.user.delete({
    where: {
      id: user_id,
    },
  });
};

export const getUser: Function = async (user_id: number) => {
  const prisma = new PrismaClient();

  return await prisma.user.findFirst({
    where: {
      id: user_id,
    },
  });
};

export const findUserByEmail: Function = async (email: string) => {
  const prisma = new PrismaClient();

  return await prisma.user.findMany({
    where: {
      email: {
        contains: email,
      },
    },
  });
};

export const findUserByName: Function = async (name: string) => {
  const prisma = new PrismaClient();

  return await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};
