import { z } from 'zod';
export default z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();
