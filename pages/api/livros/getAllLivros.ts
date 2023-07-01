import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    try {
        const livros = await prisma.livros.findMany();
        prisma.$disconnect();
        res.status(200).json(livros);
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
}