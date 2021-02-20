import { Context } from 'koa';

import { PrismaClient } from '@prisma/client';

import { decodeToken } from 'util/token';

export interface context {
    userId : Number;
}

export let createContext = async ({ctx} : Context) => {
    const prisma = new PrismaClient();

    if (ctx.header.Authorization) {
        const { userId } = decodeToken(ctx.header.Authorization);

        const user = await prisma.user.findFirst({
            where: {
                id : userId,
            },
        });

        if (user) {
            return { userId : user.id };
        }
    }
};
