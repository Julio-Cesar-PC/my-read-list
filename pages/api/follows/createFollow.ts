import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {     
    const prisma = new PrismaClient()
    const session = await getServerSession(req, res, authOptions)
    try {
        if (req.method !== 'POST') {
            throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
        } else if (!req.body.followingId) {
            throw new Error('The body parameter followingId is required at this route.')
        } else if (session?.user?.email) {
            const user = await prisma.user.findFirst({
                where: {
                    email: session.user.email,
                }
            })
            if (user?.id === req.body.followingId) {
                prisma.$disconnect()
                res.status(400).json({ error: 'You cannot follow yourself' })
            } else if (user) {
                const result = await prisma.follows.create({
                    data: {
                        followerId: user.id,
                        followingId: req.body.followingId
                    }
                })
                prisma.$disconnect()
                res.status(200).json({ message: 'Follow criada com sucesso!' })
            } else {
                prisma.$disconnect()
                res.status(400).json({ error: 'User not found' })
            }
        } else {
            prisma.$disconnect();
            res.status(400).json({ error: 'Session not found' })
        }       
    } catch (error) {
        prisma.$disconnect()
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}