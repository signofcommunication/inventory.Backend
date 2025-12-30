import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Superadmin
  const superadminPassword = await bcrypt.hash("superadmin123", 10);
  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@system.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "superadmin@system.com",
      password: superadminPassword,
      role: "SUPERADMIN",
    },
  });
  console.log("Superadmin created:", superadmin);

  // Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@system.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@system.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin created:", admin);

  // Petugas Gudang
  const gudangPassword = await bcrypt.hash("gudang123", 10);
  const gudang = await prisma.user.upsert({
    where: { email: "gudang@system.com" },
    update: {},
    create: {
      name: "Petugas Gudang",
      email: "gudang@system.com",
      password: gudangPassword,
      role: "PETUGAS_GUDANG",
    },
  });
  console.log("Petugas Gudang created:", gudang);

  // Pimpinan
  const pimpinanPassword = await bcrypt.hash("pimpinan123", 10);
  const pimpinan = await prisma.user.upsert({
    where: { email: "pimpinan@system.com" },
    update: {},
    create: {
      name: "Pimpinan",
      email: "pimpinan@system.com",
      password: pimpinanPassword,
      role: "PIMPINAN",
    },
  });
  console.log("Pimpinan created:", pimpinan);

  // Peminjam
  const peminjamPassword = await bcrypt.hash("peminjam123", 10);
  const peminjam = await prisma.user.upsert({
    where: { email: "peminjam@system.com" },
    update: {},
    create: {
      name: "Peminjam",
      email: "peminjam@system.com",
      password: peminjamPassword,
      role: "PEMINJAM",
    },
  });
  console.log("Peminjam created:", peminjam);

  // Brands
  const brand1 = await prisma.brand.upsert({
    where: { code: "BRD" },
    update: {},
    create: {
      name: "Brand Example",
      code: "BRD",
    },
  });
  console.log("Brand created:", brand1);

  const brand2 = await prisma.brand.upsert({
    where: { code: "ELC" },
    update: {},
    create: {
      name: "Electronics",
      code: "ELC",
    },
  });
  console.log("Brand created:", brand2);

  // Categories
  const category1 = await prisma.category.upsert({
    where: { code: "ELC" },
    update: {},
    create: {
      name: "Electronics",
      code: "ELC",
    },
  });
  console.log("Category created:", category1);

  const category2 = await prisma.category.upsert({
    where: { code: "FUR" },
    update: {},
    create: {
      name: "Furniture",
      code: "FUR",
    },
  });
  console.log("Category created:", category2);

  // Items
  const item1 = await prisma.item.upsert({
    where: { itemCode: "BRD-ELC-0001" },
    update: {},
    create: {
      name: "Laptop",
      brandId: brand1.id,
      categoryId: category1.id,
      itemCode: "BRD-ELC-0001",
    },
  });
  console.log("Item created:", item1);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
