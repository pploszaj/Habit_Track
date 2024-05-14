import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";


const UserController: any = {};

UserController.createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    console.log("User created successfully:", newUser);
    res.locals.user = newUser;
    next();
  } catch (error) {
    res.status(500).json({ error: "Cannot create user" });
  }
};

UserController.findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password === password) {
      res.locals.user = user;
      next();
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

export default UserController;
