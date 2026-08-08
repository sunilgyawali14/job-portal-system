import { prisma } from '../../../config/prisma.js';
import type { RegisterDTO, SafeUser } from './register.types.js';

export class RegisterRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: RegisterDTO): Promise<SafeUser> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.password, // already hashed
        role: data.role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}

export const registerRepository = new RegisterRepository();