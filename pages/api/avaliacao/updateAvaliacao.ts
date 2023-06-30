import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
    }
    const prisma = new PrismaClient()
    try {
        const result = await prisma.livrosUser.update({
            where: {
                id: req.body.id,
            },
            data: {
                nota: req.body.nota,
                status: req.body.status,
                paginasLidas: req.body.paginasLidas,
                updatedAt: new Date(),
            }
        })
        prisma.$disconnect()
        res.status(200).json({ message: 'Avaliação modificada com sucesso!' })
    } catch (error) {
        prisma.$disconnect()
        res.status(500).json({ error: 'Oops! Something went wrong.' + error })
    }
}