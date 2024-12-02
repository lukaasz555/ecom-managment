import * as bcrypt from 'bcrypt';

export async function getHashedValue(value: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(value, saltRounds);
}

export async function validateHashedValue(
  providedValue: string,
  hashedValue: string,
): Promise<boolean> {
  return await bcrypt.compare(providedValue, hashedValue);
}
