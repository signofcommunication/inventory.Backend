import { PrismaClient, User, Role } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      role: Role;
    }>
  ): Promise<User | null> {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
