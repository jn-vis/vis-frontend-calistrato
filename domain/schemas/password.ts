import { z } from "zod";

export type TFormDataPassword = z.infer<typeof passwordSchema>;


export const passwordSchema = z
  .object({
    password: z.string()
    .min(1, "O campo de senha é obrigatório"),
  })
  .transform((field) => ({
    password: field.password,
  }));
