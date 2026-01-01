import z from 'zod';

export const createBlogSchema = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .required();

export type CreateBlogDto = z.infer<typeof createBlogSchema>;
