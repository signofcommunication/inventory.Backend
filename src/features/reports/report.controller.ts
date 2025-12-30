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
 * /reports/stock/pdf:
 *   get:
 *     summary: Get stock report as PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
export const getStockReportPDF = async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await service.getStockReportPDF();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=stock-report.pdf"
    );
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/transactions:
 *   get:
 *     summary: Get transaction report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Transaction report data
 *       500:
 *         description: Internal server error
 */
export const getTransactionReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as {
      startDate?: string;
      endDate?: string;
    };
    const report = await service.getTransactionReport(startDate, endDate);
    res.json(successResponse(report));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/transactions/pdf:
 *   get:
 *     summary: Get transaction report as PDF
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
export const getTransactionReportPDF = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query as {
      startDate?: string;
      endDate?: string;
    };
    const pdfBuffer = await service.getTransactionReportPDF(startDate, endDate);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transaction-report.pdf"
    );
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/loans:
 *   get:
 *     summary: Get loan report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Loan status filter
 *     responses:
 *       200:
 *         description: Loan report data
 *       500:
 *         description: Internal server error
 */
export const getLoanReport = async (req: Request, res: Response) => {
  try {
    const { status } = req.query as { status?: string };
    const report = await service.getLoanReport(status);
    res.json(successResponse(report));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/loans/pdf:
 *   get:
 *     summary: Get loan report as PDF
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Loan status filter
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
export const getLoanReportPDF = async (req: Request, res: Response) => {
  try {
    const { status } = req.query as { status?: string };
    const pdfBuffer = await service.getLoanReportPDF(status);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=loan-report.pdf"
    );
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/suppliers:
 *   get:
 *     summary: Get supplier report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Supplier report data
 *       500:
 *         description: Internal server error
 */
export const getSupplierReport = async (req: Request, res: Response) => {
  try {
    const report = await service.getSupplierReport();
    res.json(successResponse(report));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/suppliers/pdf:
 *   get:
 *     summary: Get supplier report as PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
export const getSupplierReportPDF = async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await service.getSupplierReportPDF();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=supplier-report.pdf"
    );
    res.send(pdfBuffer);
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

/**
 * @swagger
 * /reports/summary/pdf:
 *   get:
 *     summary: Get summary report as PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
export const getSummaryPDF = async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await service.getSummaryPDF();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=summary-report.pdf"
    );
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/user-activity:
 *   get:
 *     summary: Get user activity report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: User activity report data
 *       500:
 *         description: Internal server error
 */
export const getUserActivityReport = async (req: Request, res: Response) => {
  try {
    const report = await service.getUserActivityReport();
    res.json(successResponse(report));
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};

/**
 * @swagger
 * /reports/user-activity/pdf:
 *   get:
 *     summary: Get user activity report as PDF
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
export const getUserActivityReportPDF = async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await service.getUserActivityReportPDF();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=user-activity-report.pdf"
    );
    res.send(pdfBuffer);
  } catch (error: any) {
    res.status(500).json(errorResponse(error.message));
  }
};
