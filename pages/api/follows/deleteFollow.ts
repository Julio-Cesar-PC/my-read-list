import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    const prisma = new PrismaClient()
    try {
        if (req.method !== 'DELETE') {
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`
            )
        }
        if (session?.user?.email) {
            const user = await prisma.user.findFirst({
                where: {
                    email: session.user.email,
                }
            })
            if (user?.id === req.query.id) {
                prisma.$disconnect()
                res.status(303).json({ error: 'You cannot follow yourself' })
            } else if (user) {
                const result = await prisma.follows.deleteMany({
                    where: {
                        followerId: user.id,
                        followingId: req.query.id as string
                    }
                })
                prisma.$disconnect()
                res.status(200).json({ message: `Unfollowed ${req.query.id}`})
            }
        } else {
            prisma.$disconnect()
            res.status(400).json({ error: 'User not found' })
        }
        
    } catch (error) {
        prisma.$disconnect()
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}