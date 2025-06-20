import jsonwebtoken from "jsonwebtoken"
import User from "../models/user.model.js"
import { createUser, findUserByEmail } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js"
import { signToken } from "../utils/helper.js"

export const registerUser = async (name,email,password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User Already exists")
        
    const newUser = await createUser(name,email,password)

    const token = await signToken({id: newUser._id})

    return token
}

export const loginUser = async (email,password) => {
    const user = await findUserByEmail(email)

    if(!user || user.password !== password) throw new Error("invalid Credentials")

    const token = await signToken({id: user._id})
    return {token,user}
}