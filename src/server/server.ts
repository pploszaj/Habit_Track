import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userController from "./controllers/userController";
import authController from "./controllers/authController";

require("dotenv").config();

// const User = require("./models/User");
import User from "./models/User";
const Habit = require("./models/Habit");

const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/load", (req: Request, res: Response) => {
  res.json("Hello, World!");
});

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
