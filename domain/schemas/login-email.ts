import { z } from "zod";

export type TFormData = z.infer<typeof emailSchema>;

export const emailSchema = z
  .object({
    email: z.string(),
  })
  .transform((field) => ({
    email: field.email,
  }));

