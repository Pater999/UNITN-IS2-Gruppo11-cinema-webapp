import express from 'express';

const router = express.Router();
const Admin = {
    username: 'admin',
    password: 'admin'
}

router.post('/login', (req: any, res: express.Response) =>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res.status(400).json({ error: 'User not specified' });
        return;
    }

    if (!password) {
        res.status(400).json({ error: 'Password not specified' });
        return;
    }

    if (username == Admin.username && password == Admin.password) {
        const token = Buffer.from(Admin.username + Date.now().toString()).toString('base64');
        res.status(200).json({ token, username });
        return;
    } else {
        res.status(401).json({ error: 'Admin not logged in correctly' });
    }

})

export { router as admin };
