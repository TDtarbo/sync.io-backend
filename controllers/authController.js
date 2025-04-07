import jwt from "jsonwebtoken"
import { sendVerificationEmail } from "../utils/nodemailer.js"
import { findUserByEmailDB, findUserByIdDB } from "../models/authModel.js"

//Send the verification link to the user email
const sendVerificationLink = async (req, res) => {

    const email = req.body.email

    if(!email) return res.status(400)
    
    try {

        const magicToken = jwt.sign(
            { email: email }, 
            process.env.MAGIC_SECRET_KEY, 
            { expiresIn: "10m" })

        
            
        await sendVerificationEmail(email, magicToken)

        res.sendStatus(200)

    } catch (error) {

        console.error(`Login error: \n${error}`);
        res.sendStatus(500)
    }
    
}

//Send access and refresh tokens
const loginUser = async (req, res) => {

    const userEmail = req.email

    if(!userEmail) return res.sendStatus(500)

    try {
        
        const foundUser = await findUserByEmailDB(userEmail)

        if(!foundUser) return res.sendStatus(500)

        const accessToken = jwt.sign(
            {id : foundUser.id}, 
            process.env.ACCESS_SECRET_KEY, 
            { expiresIn: "15min" }
        )

        const refreshToken = jwt.sign(
            {id : foundUser.id}, 
            process.env.REFRESH_SECRET_KEY, 
            { expiresIn: "3d" }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,  
            sameSite: "Strict",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            accessToken: accessToken, 
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            profilePicture: foundUser.profilePicture
        })

    } catch (error) {
        console.error(`loginUser error: \n${error}`);
        res.sendStatus(502)
    }

}

//Issue new access token
const refreshToken = async (req, res) => {

    const userId = req.user.id
    if(!userId) return res.sendStatus(401)

    try {

        const foundUser = await findUserByIdDB(userId)
    
        const newAccessToken = jwt.sign(
            { id: foundUser.id }, 
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "15min" }
        )

        res.status(200).json({ 
            newAccessToken: newAccessToken, 
            firstName: foundUser.firstName,
            lastName: foundUser.lastName, 
            profilePicture: foundUser.profilePicture
        })

    } catch (error) {

        console.error(`refreshToken error: \n${error}`);
        res.sendStatus(401)
    }

}

export { sendVerificationLink, loginUser, refreshToken }