import express from "express"
import {register_user, login_user} from "../controller/auth.controller.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

const router = express.Router();

router.post("/register", register_user)
router.post("/login", login_user)

export default router