import { z } from 'zod';
import { parse, isValid } from 'date-fns';

const dateSchema = z
  .string()
  .refine((value) => {
    const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
    return isValid(parsedDate);
  })
  .optional();

export default z.object({
  page: z.number().min(1).default(1),
  filter: z
    .object({
      byStatus: z.enum(['pending', 'completed']).optional(),
      orderDate: z.enum(['asc', 'desc']).optional(),
      byDate: z
        .object({
          start: dateSchema,
          end: dateSchema,
        })
        .optional(),
    })
    .optional(),
});
