import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const livros = await prisma.livros.findMany();
        prisma.$disconnect();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
}