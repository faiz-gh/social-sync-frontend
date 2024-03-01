import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  email: z.string().email(),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
