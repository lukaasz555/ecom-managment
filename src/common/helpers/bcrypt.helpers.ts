import * as bcrypt from 'bcrypt';

export async function getHashedValue(value: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(value, saltRounds);
}

export async function validateHashedValue(
  password: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}
