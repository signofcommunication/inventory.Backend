import { prisma } from "../../config/database";
const PDFDocument = require("pdfkit");
import fs from "fs";
import path from "path";

const kopSuratPath = path.join(__dirname, "../../../assets/KOP SURAT.png");

// Helper to generate PDF with header
const generatePDF = (
  title: string,
  data: any[],
  columns: string[]
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    doc.on("error", reject);

    // Add kop surat image if exists
    if (fs.existsSync(kopSuratPath)) {
      console.log("KOP SURAT image found, adding to PDF");
      doc.image(kopSuratPath, 50, 50, { width: 500 });
      doc.moveDown(2);
    } else {
      console.log("KOP SURAT image not found at:", kopSuratPath);
    }

    // Title
    doc.fontSize(18).text(title, { align: "center" });
    doc.moveDown();

    // Date
    doc
      .fontSize(12)
      .text(`Generated on: ${new Date().toLocaleDateString()}`, {
        align: "right",
      });
    doc.moveDown();

    // Table header
    doc.fontSize(10);
    columns.forEach((col, i) => {
      doc.text(col, 50 + i * 100, doc.y, { width: 90 });
    });
    doc.moveDown();

    // Table rows
    data.forEach(row => {
      columns.forEach((col, i) => {
        doc.text(row[col] || "", 50 + i * 100, doc.y, { width: 90 });
      });
      doc.moveDown();
    });

    doc.end();
  });
};

export const getStockReport = async () => {
  const items = await prisma.item.findMany({
    include: {
      brand: true,
      category: true,
      stockIns: true,
      stockOuts: true,
      loans: true,
    },
  });

  return items.map(item => ({
    id: item.id,
    name: item.name,
    code: item.itemCode,
    brand: item.brand?.name || "",
    category: item.category?.name || "",
    totalStockIn: item.stockIns.reduce((sum: number, si) => sum + si.qty, 0),
    totalStockOut: item.stockOuts.reduce((sum: number, so) => sum + so.qty, 0),
    totalLoans: item.loans
      .filter(l => l.status !== "RETURNED")
      .reduce((sum: number, l) => sum + l.qty, 0),
  }));
};

export const getStockReportPDF = async () => {
  const data = await getStockReport();
  const columns = [
    "name",
    "code",
    "brand",
    "category",
    "totalStockIn",
    "totalStockOut",
    "totalLoans",
  ];
  return generatePDF("Stock Report", data, columns);
};

export const getTransactionReport = async (
  startDate?: string,
  endDate?: string
) => {
  const whereStockIn: any = {};
  const whereStockOut: any = {};

  if (startDate && endDate) {
    whereStockIn.date = { gte: new Date(startDate), lte: new Date(endDate) };
    whereStockOut.date = { gte: new Date(startDate), lte: new Date(endDate) };
  }

  const stockIns = await prisma.stockIn.findMany({
    where: whereStockIn,
    include: { item: true, supplier: true },
  });

  const stockOuts = await prisma.stockOut.findMany({
    where: whereStockOut,
    include: { item: true },
  });

  return {
    stockIns: stockIns.map(si => ({
      type: "Stock In",
      item: si.item.name,
      qty: si.qty,
      supplier: si.supplier?.name || "",
      date: si.date.toISOString().split("T")[0],
    })),
    stockOuts: stockOuts.map(so => ({
      type: "Stock Out",
      item: so.item.name,
      qty: so.qty,
      reason: so.reason || "",
      date: so.date.toISOString().split("T")[0],
    })),
  };
};

export const getTransactionReportPDF = async (
  startDate?: string,
  endDate?: string
) => {
  const data = await getTransactionReport(startDate, endDate);
  const allData = [...data.stockIns, ...data.stockOuts];
  const columns = ["type", "item", "qty", "supplier", "reason", "date"];
  return generatePDF("Transaction Report", allData, columns);
};

export const getLoanReport = async (status?: string) => {
  const where: any = {};
  if (status) where.status = status;

  const loans = await prisma.loan.findMany({
    where,
    include: { item: true, user: true },
  });

  return loans.map(loan => ({
    id: loan.id,
    item: loan.item.name,
    borrower: loan.user.name,
    qty: loan.qty,
    status: loan.status,
    loanDate: loan.startDate?.toISOString().split("T")[0] || "",
    returnDate: loan.endDate?.toISOString().split("T")[0] || "",
    overdue: loan.endDate && new Date() > loan.endDate ? "Yes" : "No",
  }));
};

export const getLoanReportPDF = async (status?: string) => {
  const data = await getLoanReport(status);
  const columns = [
    "item",
    "borrower",
    "qty",
    "status",
    "loanDate",
    "returnDate",
    "overdue",
  ];
  return generatePDF("Loan Report", data, columns);
};

export const getSupplierReport = async () => {
  const suppliers = await prisma.supplier.findMany({
    include: { stockIns: { include: { item: true } } },
  });

  return suppliers.map(sup => ({
    name: sup.name,
    totalTransactions: sup.stockIns.length,
    totalQty: sup.stockIns.reduce((sum: number, si) => sum + si.qty, 0),
    lastTransaction:
      sup.stockIns.length > 0
        ? sup.stockIns[sup.stockIns.length - 1].date.toISOString().split("T")[0]
        : "",
  }));
};

export const getSupplierReportPDF = async () => {
  const data = await getSupplierReport();
  const columns = ["name", "totalTransactions", "totalQty", "lastTransaction"];
  return generatePDF("Supplier Report", data, columns);
};

export const getSummary = async () => {
  const totalItems = await prisma.item.count();
  const totalSuppliers = await prisma.supplier.count();
  const totalStockIn = await prisma.stockIn.count();
  const totalStockOut = await prisma.stockOut.count();
  const totalLoans = await prisma.loan.count();
  const totalUsers = await prisma.user.count({ where: { isActive: true } });

  return {
    totalItems,
    totalSuppliers,
    totalStockIn,
    totalStockOut,
    totalLoans,
    totalUsers,
  };
};

export const getSummaryPDF = async () => {
  const data = [await getSummary()];
  const columns = [
    "totalItems",
    "totalSuppliers",
    "totalStockIn",
    "totalStockOut",
    "totalLoans",
    "totalUsers",
  ];
  return generatePDF("Summary Report", data, columns);
};

export const getUserActivityReport = async () => {
  // Simple activity based on counts per role
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: { loans: true },
  });

  return users.map(user => ({
    name: user.name,
    role: user.role,
    totalLoans: user.loans.length,
  }));
};

export const getUserActivityReportPDF = async () => {
  const data = await getUserActivityReport();
  const columns = ["name", "role", "totalLoans"];
  return generatePDF("User Activity Report", data, columns);
};
