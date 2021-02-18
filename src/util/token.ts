import * as jwt from 'jsonwebtoken';
// import * as dotenv from "dotenv";
// dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY;

export const generateToken : Function = ( email : Object ) : String => {
    return jwt.sign(email, jwtSecret);
}