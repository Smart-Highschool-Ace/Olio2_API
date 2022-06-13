import { PrismaClient, User } from "@prisma/client";

import { UserUpdateArgs, Result, LoginResult } from "../interface";
import {
  authGoogleToken,
  getGeneration,
  testIsGSMStudentEmail,
} from "util/verify";
import { TokenPayload } from "google-auth-library";
import { generateAccessToken } from "util/token";

export const login: Function = async (token: string): Promise<LoginResult> => {
  const userInformation: TokenPayload = await authGoogleToken(token);
  if (!userInformation) {
    return { error: "구글 토큰 인증에서 에러 발생" };
  }
  const { sub, email, name } = userInformation;

  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    select: { name: true, email: true, id: true },
    where: { google_sub: sub },
  });
  if (user) {
    return {
      token: generateAccessToken({
        name: user.name,
        email: user.email,
        id: user.id,
      }),
    };
  }

  if (!email || !name) {
    return { error: "잘못된 계정입니다." };
  }
  const signInUser = await prisma.user.create({
    data: { email, name, google_sub: sub, generation: getGeneration(email) },
  });
  return {
    token: generateAccessToken({
      name: signInUser.name,
      email: signInUser.email,
      id: signInUser.id,
    }),
  };
};

export const checkEmail: Function = async (email: string): Promise<Result> => {
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
  if (!testIsGSMStudentEmail(email)) {
    return {
      status: false,
      error:
        "에러, 광주소프트웨어마이스터고등학교에서 발급한 학교 이메일이며, 학생계정이어야 합니다.",
    };
  }

  return { status: true };
};

export const updateUser: Function = (
  user_id: number,
  data: UserUpdateArgs,
): Promise<User> => {
  const prisma = new PrismaClient();
  return prisma.user.update({
    where: {
      id: user_id,
    },
    data,
  });
};

export const deleteUser: Function = (user_id: number): Promise<User> => {
  const prisma = new PrismaClient();

  return prisma.user.delete({
    where: {
      id: user_id,
    },
  });
};

export const getUser: Function = (user_id: number): Promise<User | null> => {
  const prisma = new PrismaClient();

  return prisma.user.findFirst({
    where: {
      id: user_id,
    },
  });
};

export const findUserByEmail: Function = (email: string): Promise<User[]> => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      email: {
        contains: email,
      },
    },
  });
};

export const findUserByName: Function = (name: string): Promise<User[]> => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};
