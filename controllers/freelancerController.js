import { createFreelancerDB, getFreelancerDB, getAllFreelancersDB } from "../models/freelancerModel.js";

//Create a new Freelancer
const createFreelancer = async (req, res) => {

  const body = req.body;
  const { firstName, lastName, email } = body;

  if(!firstName || !lastName || !email) return res.sendStatus(400)
      
  const freelancerData = {
    ...body, 
    profilePicture: process.env.DEFAULT_PROFILE
  }

  try {
  
    await createFreelancerDB(freelancerData);
    res.sendStatus(201);

  } catch (error) {
    console.error(`Create freelancer error: ${error}`);
    res.sendStatus(502)
  }
}

//Get freelancer by ID
const getFreelancer = async (req, res)  => {
  const userId = "8a4da189-5c0c-4ef6-be83-2db8ceecdcf7"

  if (!userId) return res.sendStatus(500)

  try {

    const freelancer = await getFreelancerDB(userId)

    if (!freelancer) return res.sendStatus(502)

    res.status(200).json(freelancer)

  } catch (error) {

    console.error("getFreelancer error");
    res.sendStatus(500)
  }
}

//Get all freelancers
const getAllFreelancers = async (req, res) => {

  try {
    
    const freelancers = await getAllFreelancersDB()
    res.status(200).json(freelancers)

  } catch (error) {
    
    console.error(`getAllFreelancers error ${error}`);
    res.sendStatus(500)

  }
}

export {createFreelancer, getFreelancer, getAllFreelancers}