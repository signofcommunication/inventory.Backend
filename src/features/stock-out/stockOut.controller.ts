import { Request, Response } from "express";
import * as service from "./stockOut.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

/**
 * @swagger
 * /stock-out:
 *   get:
 *     summary: Get all stock out records
 *     tags: [Stock Out]
 *     responses:
 *       200:
 *         description: List of stock out records
 *       500:
 *         description: Internal server error
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const stockOuts = await service.getAll();
    res.json(successResponse(stockOuts));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /stock-out:
 *   post:
 *     summary: Create a new stock out record
 *     tags: [Stock Out]
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
 *         description: Stock out created successfully
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
      .json(successResponse(data, "Stock out created successfully"));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};
