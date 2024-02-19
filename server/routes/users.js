import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// register user
router.post('/register', async (req, res) => {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({...req.body, password: hashedPassword});
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(500).json(err);
    }
})

// login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if(user) {
            const match = await bcrypt.compare(req.body.password, user.password);

            if(match) {
                res.status(200).send(user);
            } else {
                res.status(401).json({
                    status: 401,
                    message: 'Invalid credentials.'
                })
            }
        } else {
            res.status(404).json({
                status: 404,
                message: 'User not found.'
            })
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

export default router;