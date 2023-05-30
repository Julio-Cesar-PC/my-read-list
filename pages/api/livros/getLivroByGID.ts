import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const prisma = new PrismaClient();
        const result = await prisma.livros.findFirst({
            where: {
                googleId: req.query.googleId,
            }
        });
        prisma.$disconnect();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error });
    }
}