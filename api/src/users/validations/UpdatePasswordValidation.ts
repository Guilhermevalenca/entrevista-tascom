import { z } from 'zod';

export default z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    newPasswordConfirmation: z.string().min(6),
  })
  .required()
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'Passwords do not match',
    path: ['newPasswordConfirmation'],
  });
