import { PrismaClient } from "@prisma/client";

import * as Joi from "joi";

import { generateToken } from "../util/token";
import { hashSha512 } from "../util/hash";
import { UserCreateArgs, UserUpdateArgs } from "schema/types/mutations";

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

export const createUser: Function = async (userInput: UserCreateArgs) => {
    const prisma = new PrismaClient();
    return await prisma.user.create({
        data: {
            email: userInput.email,
            password: userInput.email,
            school: userInput.school,
            name: userInput.name,
            entrance_year: userInput.entrance_year,
            profile_image: userInput.profile_image,
            introduction: userInput.introduction,
        },
    });
};

export const updateUser: Function = async (
    user_id: number,
    updateArgs: UserUpdateArgs
) => {
    const prisma = new PrismaClient();
    return await prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            name: updateArgs.name,
            introduction: updateArgs.introduction,
            school: updateArgs.school,
            profile_image: updateArgs.profile_image,
        },
    });
};
