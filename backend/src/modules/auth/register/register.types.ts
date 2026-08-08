import { Role } from '@prisma/client';

export interface RegisterDTO {
  email: string;
  password: string;
  role: Role;
}

export interface SafeUser {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
}