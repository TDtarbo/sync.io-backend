import prisma from "./prisma_stuff/prisma.js"

const getUpcomingTasksByUserIdDB = async (userId) => {

    try {
        
        const upcomingTasks = await prisma.task.findMany({
            where: {
                dueDate: { gt: new Date(), },
                state: { not: "Completed", },
                freelancerTask: { some: { freelancerId: userId, } },
            },
            include: {
                mileStone: { 
                    include: { 
                        project: {
                            include: { freelancer: true} 
                        }
                    } 
                }
            },
            orderBy: { dueDate: 'asc' }
        });

        const simplifiedTasks = upcomingTasks.map(task => ({
            projectId: task.mileStone.projectId,
            projectTitle: task.mileStone.project.title,
            projectOwnerId: task.mileStone.project.freelancer.id,
            projectOwner: `${task.mileStone.project.freelancer.firstName} ${task.mileStone.project.freelancer.lastName}`,
            projectOwnerPic: task.mileStone.project.freelancer.profilePicture,
            taskId: task.id,
            taskTitle: task.title,
            taskPriority: task.priority,
            taskDueDate: task.dueDate
        }));

        return simplifiedTasks

    } catch (error) {
        
        console.error(`Prisma get upcoming tasks by user id error ${error}`);
        throw new Error("prisma getUpcomingTasksByUserIdDB");
    }
}

export { getUpcomingTasksByUserIdDB }