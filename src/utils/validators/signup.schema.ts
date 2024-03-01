import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
