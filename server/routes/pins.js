import express from 'express';
const router = express.Router();
import Pin from '../models/Pin.js';

// create new pin
router.post('/', async (req, res) => {
    const newPin = new Pin(req.body);

    try {
        const savedPin = await newPin.save();
        res.status(201).json(savedPin);
    } catch(err) {
        res.status(500).json(err);
    }
})

// get all pins
router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch(err) {
        res.status(404).json(err);
    }
})

export default router;