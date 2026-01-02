import z from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const envSchema = z
  .object({
    MYSQL_HOST: z.string().default('127.0.0.1'),
    MYSQL_PORT: z.coerce.number().default(3306),
    MYSQL_USERNAME: z.string(),
    MYSQL_PASSWORD: z.string(),
    MYSQL_ROOT_PASSWORD: z.string(),
    MYSQL_DATABASE: z.string(),
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production']),
  })
  .transform((data) => ({
    ...data,
    MIGRATIONS_PATH: path.join(
      process.cwd(),
      'dist',
      'migrations',
      '*{.js,.ts}',
    ),
  }));

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${parsed.error.message}`);
}

const env = parsed.data;

export const config = {
  MYSQL_HOST: env.MYSQL_HOST,
  MYSQL_PORT: env.MYSQL_PORT,
  MYSQL_USERNAME: env.MYSQL_USERNAME,
  MYSQL_PASSWORD: env.MYSQL_PASSWORD,
  MYSQL_ROOT_PASSWORD: env.MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE: env.MYSQL_DATABASE,
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
  MIGRATIONS_PATH: env.MIGRATIONS_PATH,
};
