import z from 'zod';

const createCatSchema = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string(),
});

type CreateCatDto = z.infer<typeof createCatSchema>;

export { createCatSchema };

export type { CreateCatDto };
