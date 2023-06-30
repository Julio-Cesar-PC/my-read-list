import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    try {
        if (req.query.name !== undefined && req.query.name !== null && req.query.name !== '') {
            const result = await prisma.user.findMany({
                where: {
                    name: {
                        contains: req.query.name.toString(),
                        mode: 'insensitive'
                    }
                }
            });
            prisma.$disconnect();
            res.status(200).json(result);
        } else {
            prisma.$disconnect();
            res.status(400).json({ error: 'Missing name' });
        }
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ error: 'Oops! Something went wrong.' + error });
    }
}