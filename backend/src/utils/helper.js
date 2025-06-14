import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config";

export const generateNanoid = (len) => {
    return nanoid(len);
}

export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, secret, cookieOptions)
}

export const verifyToken = (token) =>{
    return jsonwebtoken.verify(token, process.env.JWT_SECRET, cookieOptions)
}



