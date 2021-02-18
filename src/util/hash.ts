import * as crypto from 'crypto';

// import * as dotenv from "dotenv";
// dotenv.config();

const salt = process.env.SALT;

export const hashSha512 : Function = (password : String) : String => {
    return crypto.createHash('sha512').update(password + salt).digest('base64');
}
