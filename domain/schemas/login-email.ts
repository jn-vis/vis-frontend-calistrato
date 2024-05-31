import { z } from "zod";

export type TFormData = z.infer<typeof emailSchema>;

export const emailSchema = z
  .object({
    email: z.string().min(1, "O campo email é obrigatório"),
  })
  .transform((field) => ({
    email: field.email,
  }));
