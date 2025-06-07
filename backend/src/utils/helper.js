import { nanoid } from "nanoid";

export const generateNanoid = (len) => {
    return nanoid(len);
}