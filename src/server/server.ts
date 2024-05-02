import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

require('dotenv').config();

const User = require('../models/User'); 
const Habit = require('../models/Habit'); 

const app = express();
const port = 3000; 

app.use(express.json());

mongoose.connect(process.env.DB_URI as string)
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/load', (req: Request, res: Response) => {
  res.json('Hello, World!');
});

app.get('/save', (req: Request, res: Response) => {

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
