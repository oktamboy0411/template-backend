import bcrypt from 'bcryptjs'

export interface Bcrypt {
   compare: (data: string | Buffer, encrypted: string) => Promise<boolean>
   genSalt: (rounds?: number, minor?: 'a' | 'b') => Promise<string>
   hash: (a: string, b: string) => string
}

const { compare, genSalt, hash } = bcrypt as unknown as Bcrypt

export class HashingHelpers {
   public static async generatePassword(
      passwordString: string,
   ): Promise<string> {
      const salt = await genSalt(10)
      return hash(passwordString, salt)
   }
   public static async comparePassword(
      password: string,
      hashString: string,
   ): Promise<boolean> {
      return compare(password, hashString)
   }
}
