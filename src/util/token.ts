import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
// dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY;

export const generateToken : Function = ( payload : Object ) : String => {
    return jwt.sign(payload, jwtSecret);
}

export const decodeToken : Function = ( token : string ) : Object => {
    return jwt.decode(token);
}
