import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../shared/apiResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json(errorResponse("Internal Server Error"));
};
