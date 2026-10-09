import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  CORS_ORIGINS: z.string().optional(),
  CLIENT_URL: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const corsValue =
  parsed.data.CORS_ORIGINS ?? parsed.data.CLIENT_URL ?? 'http://localhost:3000';

export const env = {
  ...parsed.data,
  corsOrigins: corsValue.split(',').map((o) => o.trim()).filter(Boolean),
};
