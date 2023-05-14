import { PrismaClient } from '@prisma/client';

const getUsers = async () => {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return users;
};

const createUser = async (nome, email, authID) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
        data: {
            nome: nome,
            email: email,
            authID: authID
        }
    });
    await prisma.$disconnect();
    return user;
};

export 
    { 
    getUsers,
    createUser
    };