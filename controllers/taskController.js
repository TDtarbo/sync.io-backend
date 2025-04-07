import { getAllProjectsByUserIdDB } from "../models/projectModel.js"
import { getUpcomingTasksByUserIdDB } from "../models/taskModel.js";

const getUpcomingTasksByUserId = async (req, res) => {

   try {

    const upcomingTasks = await getUpcomingTasksByUserIdDB(req.user.id)
    res.json({ upcomingTasks: upcomingTasks })

   } catch (error) {
            
    console.error(`getAllProjectsByUserIdDB error ${error}`);
    res.sendStatus(500)

   }
}

export { getUpcomingTasksByUserId } 