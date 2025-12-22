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
    const hashedPassword = await authService.hashPassword(data.password);
    return userRepository.create({ ...data, password: hashedPassword });
  }

  async updateUser(
    id: number,
    data: Partial<{ name: string; email: string; password: string; role: Role }>
  ) {
    if (data.password) {
      data.password = await authService.hashPassword(data.password);
    }
    return userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    return userRepository.delete(id);
  }
}
