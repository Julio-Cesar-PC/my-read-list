import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    try {
        if (req.query.id !== undefined && req.query.id !== null && req.query.id !== '') {
            const result = await prisma.user.findFirst({
                include: {
                    followers: {
                        include: {
                            follower: true
                        }
                    },
                    following: {
                        include: {
                            following: true
                        }
                    },
                },
                where: {
                    id: req.query.id.toString(),
                }
            });
            prisma.$disconnect();
            res.status(200).json(result);
        } else {
            prisma.$disconnect();
            res.status(400).json({ error: 'Missing id' });
        }
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ error: 'Oops! Something went wrong.' + error });
    }
}