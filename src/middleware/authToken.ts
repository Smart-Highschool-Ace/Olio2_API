import { Context } from 'koa';

import { PrismaClient } from '@prisma/client';

import { decodeToken } from '../util/token';

export const authToken = async (ctx : Context, next: Function) => {
    const prisma = new PrismaClient();

    if (ctx.header.authorization) {
        const token = decodeToken(ctx.header.authorization);
        console.log(token);
        const user = await prisma.user.findFirst({
            where: {
                id : token.userId,
            },
        });

        if (user) {
            ctx.userId = user.id;
        }
    }

    await next();

};


