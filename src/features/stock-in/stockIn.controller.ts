import { Request, Response } from "express";
import * as service from "./stockIn.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

/**
 * @swagger
 * /stock-in:
 *   get:
 *     summary: Get all stock in records
 *     tags: [Stock In]
 *     responses:
 *       200:
 *         description: List of stock in records
 *       500:
 *         description: Internal server error
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const stockIns = await service.getAll();
    res.json(successResponse(stockIns));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /stock-in:
 *   post:
 *     summary: Create a new stock in record
 *     tags: [Stock In]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *               qty:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Stock in created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
export const create = async (req: Request, res: Response) => {
  try {
    const { itemId, qty } = req.body;
    if (!itemId || !qty) {
      return res.status(400).json(errorResponse("itemId and qty are required"));
    }
    const data = await service.create(itemId, qty);
    res
      .status(201)
      .json(successResponse(data, "Stock in created successfully"));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};
