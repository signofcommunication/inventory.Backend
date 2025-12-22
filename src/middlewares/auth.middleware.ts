import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.substring(7);
  console.log("Token:", token);
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as {
      id: number;
      role: string;
    };
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT verify error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
