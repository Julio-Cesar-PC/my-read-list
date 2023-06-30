import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient()
    try {
        if (req.method !== 'GET') {
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`
            )
        }
        if (req.query.id !== undefined && req.query.id !== null && req.query.id !== '') {
            const result = await prisma.livrosUser.findFirst({
                include: {
                    Livros: true
                },
                where: {
                    userId: req.query.id.toString(),
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            prisma.$disconnect()
            res.status(200).json(result)
        } else {
            prisma.$disconnect()
            res.status(400).json({ error: 'Missing id' })
        }
    } catch (error) {
        prisma.$disconnect()
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}