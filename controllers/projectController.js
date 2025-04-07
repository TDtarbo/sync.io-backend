import { getOverviewDB, getAllProjectsByUserIdDB } from "../models/projectModel.js";

const getProjectsByUserID = async (req, res) => {

    try {

       const projects = await getAllProjectsByUserIdDB(req.user.id)
        res.json({projects : projects})
        
    } catch (error) {

        console.error(`getProjectsByUserID error ${error}`);
        res.sendStatus(500)
    }

}

const getOverview = async (req, res) => {

    try {
        
        const projects = await getOverviewDB(req.user.id)
        res.json({projects : projects})

    } catch (error) {
        
        console.error(`getOverview error ${error}`);
        res.sendStatus(500)
    }

}

export { getProjectsByUserID, getOverview }