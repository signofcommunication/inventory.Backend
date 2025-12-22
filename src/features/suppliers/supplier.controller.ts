import { Request, Response } from "express";
import * as service from "./supplier.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of suppliers
 *       500:
 *         description: Internal server error
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const suppliers = await service.getAll();
    res.json(successResponse(suppliers));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier data
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */
export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(errorResponse("Invalid ID"));
    }
    const supplier = await service.getById(id);
    if (!supplier) {
      return res.status(404).json(errorResponse("Supplier not found"));
    }
    res.json(successResponse(supplier));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;
    if (!name) {
      return res.status(400).json(errorResponse("Name is required"));
    }
    const supplier = await service.create({ name, phone });
    res
      .status(201)
      .json(successResponse(supplier, "Supplier created successfully"));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */
export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(errorResponse("Invalid ID"));
    }
    const { name, phone } = req.body;
    const updateData: any = {};
    if (name) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    const supplier = await service.update(id, updateData);
    res.json(successResponse(supplier, "Supplier updated successfully"));
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json(errorResponse("Supplier not found"));
    } else {
      res.status(400).json(errorResponse(error.message));
    }
  }
};

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(errorResponse("Invalid ID"));
    }
    await service.remove(id);
    res.json(successResponse(null, "Supplier deleted successfully"));
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json(errorResponse("Supplier not found"));
    } else {
      res.status(500).json(errorResponse(error.message));
    }
  }
};
