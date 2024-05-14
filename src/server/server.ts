import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userController from "./controllers/userController";
import authController from "./controllers/authController";

require("dotenv").config();

const Habit = require("./models/Habit");

const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post(
  "/login",
  userController.findUser,
  authController.createJWT,
  (req: Request, res: Response) => {
    res.status(200).json({accessToken: res.locals.accessToken, message: "User login successful"});
  }
);

app.post(
  "/signup",
  userController.createUser,
  authController.createJWT,
  (req: Request, res: Response) => {
    res.status(201).json({
      message: "User created successfully!",
      accessToken: res.locals.accessToken,
    });
  }
);

app.get("/habits", authController.verifyJWT, async(req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const habits = await Habit.find({ userId: user.id });
    res.json({ habits });
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/habits", authController.verifyJWT, async (req: Request, res: Response) => {
  try {
    // Extract habit data and user from the request
    const { name, type, metric } = req.body;
    const userId = res.locals.user.id;

    // Create and save the new habit
    const newHabit = new Habit({
      name,
      type,
      metric,
      userId,
    });

    await newHabit.save();

    // Respond back with the saved habit data
    res.status(201).json({ habit: newHabit });
  } catch (error) {
    console.error("Error saving habit:", error);
    res.status(500).json({ error: "Unable to add habit." });
  }
})

app.post('/update/:name', authController.verifyJWT, async (req:Request, res: Response) => {
  console.log('hellooooo')
  const userId = res.locals.user.id; // Extracted from JWT payload
  const habitName = req.params.name;
  const { id, completed, val } = req.body;

  try {
    // Find the habit by name and userId
    const habit = await Habit.findOne({ userId, name: habitName });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Find the specific square by its id
    const square = habit.squares.find((s: { id: any; }) => s.id === id);
    if (!square) {
      console.log('still here')
      return res.status(404).json({ message: 'Square not found' });
    }

    // Update the square's fields
    square.completed = completed;
    square.val = val;

    // Save the updated habit document
    await habit.save();

    res.status(200).json({ message: 'Square updated successfully' });
  } catch (error) {
    console.error('Error updating square:', error);
    res.status(500).json({ message: 'Server error while updating square' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
