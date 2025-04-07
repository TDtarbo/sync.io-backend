import express from "express"
import { loginUser, refreshToken, sendVerificationLink } from "../controllers/authController.js"
import { clearCookie, verifyCookie, verifyMagicLinkToken } from "../middleware/jwtTokenMiddleWare.js"

const authRouter = express.Router()

authRouter.route("/verify")
    .post(sendVerificationLink)

authRouter.route("/login")
    .get(verifyMagicLinkToken, loginUser)

authRouter.route("/logout")
    .get(clearCookie)

authRouter.route("/refresh-token")
    .get(verifyCookie, refreshToken)

export default authRouter
