import { getUsers } from '../../utils/db';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

async function handler(req, res) {
    const { user } = getSession(req, res);
    
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default withApiAuthRequired(handler)