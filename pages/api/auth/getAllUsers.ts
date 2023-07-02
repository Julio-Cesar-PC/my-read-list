import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const prisma = new PrismaClient()
        if (req.method !== 'GET') {
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`
            )
        } else {
            const result = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true
                }
            })
            prisma.$disconnect()
            res.status(200).json(result)
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}