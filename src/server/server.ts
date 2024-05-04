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

app.post('/login', (req:Request, res:Response) => {
  const verifyUser = async (userData: {username: string, password: string}) => {
    try {
      const { username, password } = userData;
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (user.password === password) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  };
  verifyUser(req.body);
})

app.post('/signup', (req:Request, res:Response) => {
  const createUser = async (userData: {username: string, password: string}) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      console.log('User created successfully:', newUser);
      res.status(200).send('Success');
    } catch(error) {
      console.error('Error creating user:', error);
      res.status(400).send('Unsuccessful');
    }
  }

  createUser(req.body)
})

app.get('/save', (req: Request, res: Response) => {
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
