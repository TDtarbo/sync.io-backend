import prisma from "./prisma_stuff/prisma.js";

const findUserByIdDB = async (id) => {

    if (!id) return false

    try {
        
        const freelancer = await prisma.freelancer.findUnique({
            where: {id: id}
        })
        return freelancer

    } catch (error) {
        console.error(`findUserDB error: \n${error}`);
        throw new Error("findUserDB error");
    }
}

const findUserByEmailDB = async (email) => {

    if (!email) return false

    try {
        
        const freelancer = await prisma.freelancer.findUnique({
            where: {email: email}
        })
        return freelancer

    } catch (error) {
        console.error(`findUserDB error: \n${error}`);
        throw new Error("findUserDB error");
    }
}

export { findUserByIdDB, findUserByEmailDB }