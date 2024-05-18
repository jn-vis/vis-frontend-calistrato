import { z } from "zod";

export type TFormDataPassword = z.infer<typeof passwordSchema>;


export const passwordSchema = z
  .object({
    password: z.string()
    .min(1, "O campo de senha é obrigatório")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .transform((field) => ({
    password: field.password,
  }));
