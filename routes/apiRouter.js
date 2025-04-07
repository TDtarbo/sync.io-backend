import express from "express";
import freelancerRouter from "./freelancerRoutes.js";
import authRouter from "./authRouter.js";
import projectsRouter from "./projectsRouter.js";
import taskRouter from "./taskRouter.js";

const apiRouter = express.Router();

apiRouter.use("/freelancer", freelancerRouter);
apiRouter.use("/auth", authRouter)
apiRouter.use("/project", projectsRouter)
apiRouter.use("/task", taskRouter)

export { apiRouter };
