import express, { Request, Response } from 'express';
import User from '../models/User';

const userRoutes = express.Router();

// CREATE - POST /users
userRoutes.post('/users', async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;
        const newUser = await User.create({ username, password, email });
        res.status(201).json(newUser);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// READ - GET /users
userRoutes.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// READ - GET /users/:id
userRoutes.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - PUT /users/:id
userRoutes.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const { username, password, email } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ username, password, email });
        res.json(user);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

// DELETE - DELETE /users/:id
userRoutes.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ message: error.message });
    }
});

export default userRoutes;
