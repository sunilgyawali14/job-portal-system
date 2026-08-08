import { registerRepository } from './register.repository.js';
import { hashPassword } from '../../../utils/hash.js';
import { generateToken } from '../../../utils/jwt.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { RegisterInput } from '../register/register.validation.js';
import type { SafeUser } from './register.types.js';

interface RegisterResult {
  user: SafeUser;
  token: string;
}

export class RegisterService {
  async register(input: RegisterInput): Promise<RegisterResult> {
    const { email, password, role } = input;

    // 1. Check for existing user
    const existingUser = await registerRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(409, 'A user with this email already exists');
    }

    // 2. Hash password
    const hashedPassword = await hashPassword(password);

    // 3. Create user
    const user = await registerRepository.createUser({
      email,
      password: hashedPassword,
      role,
    });

    // 4. Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }
}

export const registerService = new RegisterService();