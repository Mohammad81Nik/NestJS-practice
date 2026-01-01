import z from 'zod';

const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

type CreateUserDto = z.infer<typeof createUserSchema>;

export { createUserSchema };

export type { CreateUserDto };
