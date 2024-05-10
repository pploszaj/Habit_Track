import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";


const authController: any = {};

authController.createJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    return res.status(500).json({
      error: "ACCESS_TOKEN_SECRET is not defined in the environment variables.",
    });
  }
  const payload = { id: user._id, username: user.username };
  const accessToken = jwt.sign(payload, accessTokenSecret as string);
  res.locals.accessToken = accessToken;
  next();
};

authController.verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "No token provided or improperly formatted" });
  }
  const token = authHeader.split(" ")[1];
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessTokenSecret) {
    return res.status(500).json({ error: 'ACCESS_TOKEN_SECRET is not defined in environment variables' });
  }
  jwt.verify(token, accessTokenSecret as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token is not valid' });
    }
    res.locals.user = decoded;
    next();
});
};

export default authController;
