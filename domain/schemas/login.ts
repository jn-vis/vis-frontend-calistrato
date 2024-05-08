import { z } from "zod";

export type TFormData = z.infer<typeof schemaForm>;

export const schemaForm = z
  .object({
    email: z.string().email("Por favor, informe um email válido"),
    setError: z.function().args(z.string(), z.object({ type: z.string(), message: z.string() })).returns(z.void()).optional(),
//     emailConfirmation: z.string().email({ message: "E-mail inválido" }),
//   })
//   .refine((data) => data.email === data.emailConfirmation, {
//     message: "Os e-mails não correspondem",
//     path: ["emailConfirmation"],
  })
  .transform((field) => ({
    email: field.email,
    setError: field.setError,
    // emailConfirmation: field.emailConfirmation,
  }));


