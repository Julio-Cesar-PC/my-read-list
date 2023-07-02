import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'DELETE') {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
    const prisma = new PrismaClient()
    try {
        if (req.query.id) {
            const result = await prisma.livrosUser.delete({
                where: {
                    id: req.query.id.toString(),
                }
            })
            prisma.$disconnect()
            res.status(200).json({ message: 'Avaliação deletada com sucesso!' })
        } else {
            prisma.$disconnect()
            res.status(500).json({ error: 'Oops! Something went wrong.' })
        }
    } catch (error) {
        prisma.$disconnect()
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}