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
        if (req.method !== 'GET') {
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

            if (user) {
                const result = await prisma.follows.findMany({
                    select: {
                        follower: true,
                    },
                    where: {
                        followingId: user.id,
                    }
                })
                prisma.$disconnect()
                res.status(200).json(result)
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