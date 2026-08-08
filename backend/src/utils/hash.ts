import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// ── Token hashing (for refresh tokens stored in DB) ───────────────────────────

export const hashToken = async (token: string): Promise<string> => {
  return bcrypt.hash(token, SALT_ROUNDS);
};

export const compareToken = async (
  plainToken: string,
  hashedToken: string
): Promise<boolean> => {
  return bcrypt.compare(plainToken, hashedToken);
};