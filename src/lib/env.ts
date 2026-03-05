import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  S3_BUCKET: z.string().min(1).optional(),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  S3_REGION: z.string().default('auto'),
  S3_ENDPOINT: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)
