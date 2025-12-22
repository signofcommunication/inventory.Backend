import { Request, Response } from "express";
import * as service from "./report.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

/**
 * @swagger
 * /reports/stock:
 *   get:
 *     summary: Get stock report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Stock report data
 *       500:
 *         description: Internal server error
 */
export const getStockReport = async (req: Request, res: Response) => {
  try {
    const report = await service.getStockReport();
    res.json(successResponse(report));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/summary:
 *   get:
 *     summary: Get system summary
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: System summary data
 *       500:
 *         description: Internal server error
 */
export const getSummary = async (req: Request, res: Response) => {
  try {
    const summary = await service.getSummary();
    res.json(successResponse(summary));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};
