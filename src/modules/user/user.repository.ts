import { PrismaClient, User, Role } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  async findAll(): Promise<Omit<User, "password">[]> {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: number): Promise<Omit<User, "password"> | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<Omit<User, "password">> {
    const user = await prisma.user.create({ data });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      role: Role;
      isActive: boolean;
    }>
  ): Promise<Omit<User, "password"> | null> {
    try {
      const user = await prisma.user.update({ where: { id }, data });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<Omit<User, "password"> | null> {
    // Soft delete: set isActive to false
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { isActive: false },
      });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch {
      return null;
    }
  }
}
