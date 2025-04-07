import express from "express"
import { verifyToken } from "../middleware/jwtTokenMiddleWare.js"
import { getOverview, getProjectsByUserID } from "../controllers/projectController.js"

const projectsRouter = express.Router()

projectsRouter.route("/all")
    .get(verifyToken, getProjectsByUserID)

projectsRouter.route("/overview")
    .get(verifyToken, getOverview)


export default projectsRouter
