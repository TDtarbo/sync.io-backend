import prisma from "./prisma_stuff/prisma.js";

//Add freelancer to the database
const createFreelancerDB = async (freelancerData) => {

    try {
        
    await prisma.freelancer.create({
        data: {
            firstName: freelancerData.firstName,
            lastName: freelancerData.lastName,
            email: freelancerData.email,
            profilePicture: freelancerData.profilePicture,
        },
    });


    } catch (error) {
        console.error(`Prisma createFreelancerDB error ${error}`);
        throw new Error(`prisma createFreelancerDB`);
      
    }
}

//Get freelancer from the database
const getFreelancerDB = async (id) => {

    try {
        
        const result = await prisma.freelancer.findUnique({
            where: {id:id}
        })

        return result

    } catch (error) {

        console.error(`Prisma getFreelancer error ${error}`);
        throw new Error("prisma getFreelancerDB");
        
        
    }
}

//Get all freelancers from the database
const getAllFreelancersDB = async () => {

    try {
        
        const freelancers = await prisma.freelancer.findMany()
        return freelancers

    } catch (error) {
        
        console.error(`Prisma get all freelancers error ${error}`);
        throw new Error("prisma getAllFreelancers");
    }
}


const getAllProjectsByUserIdDB = async (email) => {

    try {

        const projects = await prisma.freelancer.findMany({
            where: {
                email: email
            }, 
            select: {
                project: true
            }
        })


        return projects[0].project

        
    } catch (error) {

        console.error(`Prisma get all project by email id error ${error}`);
        throw new Error("prisma getAllProjectsFromUserID");
    }
    

}


export { createFreelancerDB, getFreelancerDB, getAllFreelancersDB, getAllProjectsByUserIdDB }