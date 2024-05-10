import { z } from "zod";

export type TFormData = z.infer<typeof emailSchema>;

export const emailSchema = z
  .object({
    email: z.string(),
    setError: z.function().args(z.string(), z.object({ type: z.string(), message: z.string() })).returns(z.void()).optional(),
  })
  .transform((field) => ({
    email: field.email,
    setError: field.setError,
  }));

