import express from "express";
import { createFreelancer, getAllFreelancers, getFreelancer } from "../controllers/freelancerController.js";
import { verifyToken } from "../middleware/jwtTokenMiddleWare.js";


const freelancerRouter = express.Router();


// ! TODO: create update and delete
freelancerRouter.route("/")
  .post(createFreelancer)
  .get(verifyToken, getFreelancer)

freelancerRouter.route("/all")
  .get(verifyToken, getAllFreelancers)

export default freelancerRouter;
