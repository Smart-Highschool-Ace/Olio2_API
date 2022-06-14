import { User } from "@prisma/client";

import { UserUpdateArgs, Result, LoginResult } from "../interface";
import {
  authGoogleToken,
  getGeneration,
  testIsGSMStudentEmail,
} from "util/verify";
import { TokenPayload } from "google-auth-library";
import { generateAccessToken } from "util/token";
import {
  deleteUserById,
  getUserById,
  getUserFromEmail,
  getUserFromSub,
  insertUser,
  updateUserInformation,
} from "repository/user.repo";

export const login: Function = async (token: string): Promise<LoginResult> => {
  const userInformation: TokenPayload = await authGoogleToken(token);
  if (!userInformation) {
    return { error: "구글 토큰 인증에서 에러 발생" };
  }
  const { sub, email, name } = userInformation;

  const user = getUserFromSub(sub, {
    select: { name: true, email: true, id: true },
  });

  if (user) {
    return {
      token: generateAccessToken({
        name: user.name,
        email: user.email,
        userId: user.id,
      }),
    };
  }

  if (!email || !name) {
    return { error: "잘못된 계정입니다." };
  }
  const signInUser = await insertUser({
    email,
    name,
    google_sub: sub,
    generation: getGeneration(email),
  });

  return {
    token: generateAccessToken({
      name: signInUser.name,
      email: signInUser.email,
      userId: signInUser.id,
    }),
  };
};

export const checkEmail: Function = async (email: string): Promise<Result> => {
  if (!testIsGSMStudentEmail(email)) {
    return {
      status: false,
      error:
        "에러, 광주소프트웨어마이스터고등학교에서 발급한 학교 이메일이며, 학생계정이어야 합니다.",
    };
  }

  const isDuplicate = getUserFromEmail(email);

  if (isDuplicate) {
    return {
      status: false,
      error: "에러 , 이미 등록된 이메일입니다.",
    };
  }

  return { status: true };
};

export const updateUser: Function = async (
  user_id: number,
  data: UserUpdateArgs,
): Promise<User> => updateUserInformation(user_id, data);

export const deleteUser: Function = (user_id: number): Promise<User> =>
  deleteUserById(user_id);

export const getUser: Function = (user_id: number): Promise<User | null> =>
  getUserById(user_id);

export const findUserByEmail: Function = (email: string): Promise<User[]> =>
  findUserByEmail(email);

export const findUserByName: Function = (name: string): Promise<User[]> =>
  findUserByName(name);
