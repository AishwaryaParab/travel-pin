import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pinRoutes from './routes/pins.js';
import userRoutes from './routes/users.js';
import cors from 'cors';

const app = express();
dotenv.config();

try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully.");
} catch(err) {
    console.log(err);
}

app.use(express.json()); // so that it can accept json in the body
app.use(cors());
app.use('/api/pins', pinRoutes);
app.use('/api/users', userRoutes);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});