import { getUsers } from '../../../utils/db';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

// api/auth/getUsers.js
async function handler(req, res) {
    // checkJwt middleware will set req.user if a valid access token is present
    // console.log('req.user', req.user);
    //

    const { user } = getSession(req, res);
    
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default withApiAuthRequired(handler)