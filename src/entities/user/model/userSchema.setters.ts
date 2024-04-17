import * as bcrypt from 'bcrypt';

export async function setPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}
