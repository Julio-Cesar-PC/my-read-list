import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    try {
        if (req.query.email !== undefined && req.query.email !== null && req.query.email !== '') {
            const result = await prisma.user.findMany({
                where: {
                    email: {
                        contains: req.query.email.toString(),
                        mode: 'insensitive'
                    }
                }
            });
            prisma.$disconnect();
            res.status(200).json(result);
        } else {
            prisma.$disconnect();
            res.status(400).json({ error: 'Missing email' });
        }
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ error: 'Oops! Something went wrong.' + error });
    }
}