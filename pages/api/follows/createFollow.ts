import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'POST') {
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`
            )
        } else if (!req.body.followerId) {
            throw new Error(
                'The body parameter followerId is required at this route.'
            )
        } else if (!req.body.followingId) {
            throw new Error(
                'The body parameter followingId is required at this route.'
            )
        }
        const prisma = new PrismaClient()
        const result = await prisma.follows.create({
            data: {
                followerId: req.body.followerId,
                followingId: req.body.followingId
            }
        })
        prisma.$disconnect()
        res.status(200).json({ message: 'Follow criada com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}