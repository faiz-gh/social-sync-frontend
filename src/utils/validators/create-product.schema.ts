import {object, string, z} from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

export const productFormSchema = z.object({
  description: z.string().optional(),
  imageUrl: z.array(fileSchema).optional(),
  tags: z.array(z.string()).optional(),
  location: z.string().optional(),
  postSchedule: z.date().optional(),
});

export type CreateProductInput = z.infer<typeof productFormSchema>;
