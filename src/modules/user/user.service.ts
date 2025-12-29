import { UserRepository } from "./user.repository";
import { AuthService } from "../auth/auth.service";
import { Role } from "@prisma/client";

const userRepository = new UserRepository();
const authService = new AuthService();

export class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserById(id: number) {
    return userRepository.findById(id);
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await authService.hashPassword(data.password);
    return userRepository.create({ ...data, password: hashedPassword });
  }

  async updateUser(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      role: Role;
      isActive: boolean;
    }>,
    currentUserId: number
  ) {
    // Prevent user from changing their own role
    if (data.role && id === currentUserId) {
      throw new Error("Users cannot change their own role");
    }
    if (data.password) {
      data.password = await authService.hashPassword(data.password);
    }
    return userRepository.update(id, data);
  }

  async updateUserStatus(id: number, isActive: boolean, currentUserId: number) {
    // Prevent SUPERADMIN from deactivating themselves
    if (!isActive && id === currentUserId) {
      const user = await userRepository.findById(id);
      if (user?.role === Role.SUPERADMIN) {
        throw new Error("SUPERADMIN cannot deactivate themselves");
      }
    }
    return userRepository.update(id, { isActive });
  }

  async deleteUser(id: number, currentUserId: number) {
    // Prevent SUPERADMIN from deleting themselves
    if (id === currentUserId) {
      const user = await userRepository.findById(id);
      if (user?.role === Role.SUPERADMIN) {
        throw new Error("SUPERADMIN cannot delete themselves");
      }
    }
    return userRepository.delete(id);
  }
}
