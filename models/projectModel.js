import prisma from "./prisma_stuff/prisma.js";

const getOverviewDB = async (userId) => {

    const freelancerId = userId;
  
    try {
        
        const myProjects = await prisma.project.findMany({
          where: { createdBy: freelancerId },
          include: {
            mileStone: { include: { task: true } },
            freelancerProject: true,
          },
        });
    
        
        const remainingMyProjects = myProjects.filter((project) => {
          const hasIncompleteTasks = project.mileStone.some((milestone) =>
            milestone.task.some((task) => task.state !== 'Complete')
          );
          return hasIncompleteTasks;
        }).length;
    
        
        const totalMyProjectTasks = myProjects.reduce((acc, project) => {
          const projectTasks = project.mileStone.reduce(
            (sum, milestone) => sum + milestone.task.length,
            0
          );
          return acc + projectTasks;
        }, 0);
    
        // 5. Remaining tasks in my projects
        const remainingMyProjectsTasks = myProjects.reduce((acc, project) => {
          const incompleteTasks = project.mileStone.reduce((sum, milestone) => {
            return (
              sum + milestone.task.filter((task) => task.state !== 'DONE').length
            );
          }, 0);
          return acc + incompleteTasks;
        }, 0);
    
        
        const freelancerTasks = await prisma.freelancerTask.findMany({
          where: { freelancerId },
          include: {
            task: {
              include: { mileStone: { include: { project: true } } },
            },
          },
        });
    
        
        const remainingTasks = freelancerTasks.filter(
          (ft) => ft.task.state !== 'DONE'
        ).length;
    
        
        const remainingTaskProjects = new Set(
          freelancerTasks
            .filter((ft) => ft.task.state !== 'DONE')
            .map((ft) => ft.task.mileStone.projectId)
        ).size;
    
        
        const contributions = freelancerTasks.length;
    
        
        const contributionProjectsCount = new Set(
          freelancerTasks.map((ft) => ft.task.mileStone.projectId)
        ).size;
    
        // Return the stats
        return {
          myProjects: myProjects.length,
          remainingMyProjects,
          myProjectsTasks: totalMyProjectTasks,
          remainingMyProjectsTasks,
          remainingTasks,
          remainingTaskProjects,
          contributions,
          contributionProjects: contributionProjectsCount,
        };
    } catch (error) {
        console.error(`Prisma get freelancer data error: ${error}`);
        throw new Error("prisma getFreelancerData");
    }
}


const getAllProjectsByUserIdDB = async (userId) => {

  try {

      const projects = await prisma.freelancer.findMany({
          where: {
              id: userId
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

export { getOverviewDB, getAllProjectsByUserIdDB }