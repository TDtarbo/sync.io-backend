import express from "express"
import { verifyToken } from "../middleware/jwtTokenMiddleWare.js"
import { getUpcomingTasksByUserId } from "../controllers/taskController.js"

const taskRouter = express.Router()

taskRouter.route("/upcoming")
    .get(verifyToken, getUpcomingTasksByUserId)

export default taskRouter
