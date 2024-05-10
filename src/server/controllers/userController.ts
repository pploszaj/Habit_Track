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

UserController.createJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const user = res.locals.user;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    return res
      .status(500)
      .json({
        error:
          "ACCESS_TOKEN_SECRET is not defined in the environment variables.",
      });
  }
  const payload = {id: user._id, username: user.username};
  const accessToken = jwt.sign(payload, accessTokenSecret as string);
  res.locals.accessToken = accessToken;
  next();
};

export default UserController;
