import { PrismaClient } from '@prisma/client';

import * as Joi from 'joi';

import { generateToken } from '../util/token';
import { hashSha512 } from 'util/hash';

interface loginResult{
    token?: string;
    error?: string;
    errorCode?: number;
}

export const login : Function = async (email : string, password : string) => {
    const bodyForm = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });//받는 값의 형식을 검사하는 구문
    
    console.log(email);
    // 위의 규칙에 알맞지않은 값이 들어올 경우 400을 리턴한다.
    if(bodyForm.validate({email, password}).error){
        return {
            error: "Bad Request",
            errorCode: 400,
        };
    }

    const prisma = new PrismaClient();

    const hashedPassword = hashSha512(password);

    const user = (
        await prisma.user.findMany({
            where: {
                email: email,
                password: hashedPassword,
            }
        })
    )[0];
    

    if(user){
        const token = { token : generateToken({"email" : email})};
        return token;
    }else{
        return {
            error: "Not Found",
            errorCode : 404,
        };
    }

}