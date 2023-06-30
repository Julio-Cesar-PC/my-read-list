import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

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
        }
        if (req.query.id !== undefined && req.query.id !== null && req.query.id !== '') {
            
            const result = await prisma.livrosUser.findMany({
                include: {
                    Livros: true,
                },
                where: {
                    userId: req.query.id.toString(),
                }})
            prisma.$disconnect()
            res.status(200).json(result)
        } else {
            prisma.$disconnect()
            res.status(400).json({ error: 'Missing id' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}