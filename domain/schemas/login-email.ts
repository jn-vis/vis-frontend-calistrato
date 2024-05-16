import { z } from "zod";

export type TFormData = z.infer<typeof emailSchema>;

export const emailSchema = z
  .object({
    email: z.string().min(1, "O campo email é obrigatório"),
  })
  .transform((field) => ({
    email: field.email,
  }));



// export type TFormData = z.infer<typeof emailSchema>;

// export const emailSchema = z
//   .object({
//     email: z.string().min(1, "O campo email é obrigatório"),
//     confirmEmail: z.string().min(1, "A confirmação do email é obrigatória")
//   })
//   .refine((data) => data.email === data.confirmEmail, {
//     message: "Os emails não coincidem",
//     path: ["confirmEmail"], // Isso destaca o campo de confirmação de email se houver um erro
//   })
//   .transform((field) => ({
//     email: field.email,
//     confirmEmail: field.confirmEmail,
//   }));

