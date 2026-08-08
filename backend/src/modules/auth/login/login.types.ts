import { Role } from '@prisma/client';

export interface SafeUser {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface UserWithPassword extends SafeUser {
  passwordHash: string;
}
