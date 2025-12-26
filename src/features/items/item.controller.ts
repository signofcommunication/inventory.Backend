import { Request, Response } from "express";
import * as service from "./item.service";
import { successResponse, errorResponse } from "../../shared/apiResponse";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../uploads/items"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items
 *       500:
 *         description: Internal server error
 */
export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await service.getAll();
    res.json(successResponse(items));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item data
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json(errorResponse("Invalid ID"));
    }
    const item = await service.getById(id);
    if (!item) {
      return res.status(404).json(errorResponse("Item not found"));
    }
    res.json(successResponse(item));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               kodeBarang:
 *                 type: string
 *               namaBarang:
 *                 type: string
 *               kategoriId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *                 default: 0
 *               unit:
 *                 type: string
 *               fotoBarang:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional)
 *     responses:
 *       201:
 *         description: Item created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
export const create = [
  upload.single("fotoBarang"),
  async (req: Request, res: Response) => {
    try {
      const { kodeBarang, namaBarang, kategoriId, unit } = req.body;
      const fotoBarang = req.file ? req.file.filename : undefined;
      if (!kodeBarang || !namaBarang || !kategoriId || !unit) {
        return res
          .status(400)
          .json(
            errorResponse(
              "kodeBarang, namaBarang, kategoriId, and unit are required"
            )
          );
      }
      const kategoriIdNum = parseInt(kategoriId);
      if (isNaN(kategoriIdNum)) {
        return res.status(400).json(errorResponse("kategoriId must be a valid number"));
      }
      const item = await service.create({
        kodeBarang,
        namaBarang,
        kategoriId: kategoriIdNum,
        unit,
        fotoBarang,
      });
      res.status(201).json(successResponse(item, "Item created successfully"));
    } catch (error: any) {
      res.status(400).json(errorResponse(error.message));
    }
  },
];

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               namaBarang:
 *                 type: string
 *               kategoriId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               unit:
 *                 type: string
 *               fotoBarang:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional)
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
export const update = [
  upload.single("fotoBarang"),
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json(errorResponse("Invalid ID"));
      }
      const { namaBarang, kategoriId, quantity, unit } = req.body;
      const fotoBarang = req.file ? req.file.filename : undefined;
      const updateData: any = {};
      if (namaBarang) updateData.namaBarang = namaBarang;
      if (kategoriId) {
        const kategoriIdNum = parseInt(kategoriId);
        if (isNaN(kategoriIdNum)) {
          return res.status(400).json(errorResponse("kategoriId must be a valid number"));
        }
        updateData.kategoriId = kategoriIdNum;
      }
      if (quantity !== undefined) {
        const quantityNum = parseInt(quantity);
        if (isNaN(quantityNum)) {
          return res.status(400).json(errorResponse("quantity must be a valid number"));
        }
        updateData.quantity = quantityNum;
      }
      if (unit) updateData.unit = unit;
      if (fotoBarang) updateData.fotoBarang = fotoBarang;
      const item = await service.update(id, updateData);
      res.json(successResponse(item, "Item updated successfully"));
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json(errorResponse("Item not found"));
      } else {
        res.status(400).json(errorResponse(error.message));
      }
    }
  },
];

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Item not found
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
    res.json(successResponse(null, "Item deleted successfully"));
  } catch (error: any) {
    if (error.code === "P2025") {
      res.status(404).json(errorResponse("Item not found"));
    } else {
      res.status(500).json(errorResponse(error.message));
    }
  }
};
