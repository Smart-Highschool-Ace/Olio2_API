import { Prisma, PrismaClient } from "@prisma/client";
import { UserUpdateArgs } from "interface/User";

const prisma = new PrismaClient();

export const insertUser: Function = async (data: {
  email: string;
  name: string;
  google_sub: string;
  generation: number;
}) => prisma.user.create({ data });

export const updateUserInformation: Function = async (
  id: number,
  data: UserUpdateArgs,
) =>
  prisma.user.update({
    where: { id },
    data,
  });

export const deleteUserById: Function = (id: number) =>
  prisma.user.delete({ where: { id } });

export const getUserFromSub: Function = async (
  google_sub: string,
  select: Prisma.UserSelect | null | undefined = undefined,
) => prisma.user.findUnique({ where: { google_sub }, select });

export const getUserFromEmail: Function = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const getUserById: Function = async (user_id: number) =>
  prisma.user.findUnique({ where: { id: user_id } });

export const findUserByEmail: Function = async (email: string) =>
  prisma.user.findMany({ where: { email: { contains: email } } });

export const findUserByName: Function = async (name: string) =>
  prisma.user.findMany({ where: { name: { contains: name } } });
