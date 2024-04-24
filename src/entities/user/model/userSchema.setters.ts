import * as bcrypt from 'bcrypt';

export async function hashField(field: string): Promise<string> {
  const saltOrRounds = 10;
  return await bcrypt.hash(field, saltOrRounds);
}
