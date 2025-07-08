import { z } from 'zod';

export default z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .required()
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });
