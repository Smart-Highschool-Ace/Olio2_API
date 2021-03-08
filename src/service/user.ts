import { Prisma, PrismaClient } from "@prisma/client";

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

export const createUser: Function = async (data: UserCreateArgs) => {
    const prisma = new PrismaClient();
    const user = data.user;
    return await prisma.user.create({
        data: {
            email: user.email,
            password: user.password,
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
    { user }: UserUpdateArgs
) => {
    const prisma = new PrismaClient();
    return await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            name: user.name,
            introduction: user.introduction,
            school: user.school,
            profile_image: user.profile_image,
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
