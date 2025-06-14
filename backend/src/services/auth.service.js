import jsonwebtoken from "jsonwebtoken"
import User from "../models/user.model"
import { createUser, findUserByEmail } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler"

export const registerUser = async (name,email,password) => {
    const user = await findUserByEmail({email})
    if(user) throw new ConflictError("User Already exists")
        
    const newUser = await createUser(name,email,password)

    const token = await jsonwebtoken.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "Id"});

    return token
}