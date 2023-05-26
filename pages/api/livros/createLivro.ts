import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { createLivro } from '../../../utils/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        createLivro(req.body)
        res.status(200).json({ message: 'Livro criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: 'Oops! Something went wrong.' })
    }
}