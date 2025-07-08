import { z } from 'zod';

export default z
  .object({
    title: z.string().min(3),
    description: z.string().min(3),
  })
  .required();
