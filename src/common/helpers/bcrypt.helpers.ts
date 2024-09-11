import * as bcrypt from 'bcrypt';

export async function getHashedPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function validatePassword(
  password: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}
