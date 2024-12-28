import * as bcrypt from 'bcrypt';

export async function HashingPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function ComparePassword(
  input: string,
  user: string,
): Promise<boolean> {
  return await bcrypt.compare(input, user);
}
