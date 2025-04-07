import express from "express";
import handleTryCatchError from "../utils/util.js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { verifyMagicLinkToken } from "./auth.js";

const projectRouter = express.Router();
const prisma = new PrismaClient();
dotenv.config();

projectRouter.use(express.json());

//Get Requests
projectRouter.get("/all", verifyMagicLinkToken, async (req, res) => {
  try {
    const currentUser = req.user;

    const projects = await prisma.project.findMany({
      where: {
        createdBy: currentUser,
      },
      include: {
        _count: {
          select: {
            freelancerProject: true,
          },
        },
        freelancerProject: {
          select: {
            freelancer: {
              select: {
                _count: {
                  select: {
                    freelancerTask: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const restructuredData = projects.map((project) => {
      let totalTasks = 0;

      project.freelancerProject.forEach((freelancerProject) => {
        
        totalTasks =
          totalTasks + freelancerProject.freelancer._count.freelancerTask;
      });

      return {
        id: project.id,
        title: project.title,
        description: project.description,
        dueDate: project.dueDate,
        createdAt: project.createdAt,
        freelancerCount: project._count.freelancerProject,
        taskCount: totalTasks,
      };
    });

    res.json({ projects: restructuredData });
  } catch (error) {
    handleTryCatchError(res, error, "project");
  }
});

//POST Requests
projectRouter.post("/new", async (req, res) => {
  const defaultProfilePicture = process.env.DEFAULT_PROFILE;

  try {
    const token = req.headers.token;

    if (!token) {
      res.json({ message: "No token provided" });
      return;
    }

    const { title, description = null, dueDate } = req.body;

    const project = await prisma.project.create({
      data: {
        title: title,
        description: description,
        dueDate: new Date(dueDate),
        createdBy: token,

        freelancerProject: {
          create: {
            freelancerId: token,
            addedByFreelancerId: token,
            role: "Team Lead",
          },
        },
      },
      include: {
        freelancerProject: true,
      },
    });
    res.json(project);
  } catch (error) {
    handleTryCatchError(res, error, "project", 28);
  }
});

projectRouter.post("/new/freelancer", verifyMagicLinkToken, async (req, res) => {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      res.json({ message: "Something is wrong" });
      return;
    }

    const { freelancerId, projectId, role } = req.body;

    const freelancer = await prisma.freelancerProject.create({
      data: {
        freelancerId: freelancerId,
        addedByFreelancerId: currentUser,
        projectId: projectId,
        role: role,
      },
    });
    res.json(freelancer);
  } catch (error) {
    handleTryCatchError(res, error, "project", 73);
  }
});

export { projectRouter };
