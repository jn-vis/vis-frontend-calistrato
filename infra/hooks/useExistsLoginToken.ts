// src/infrastructure/hooks/loginHooks.ts

import { UseMutationOptions, UseMutationResult, useMutation, MutationFunction } from "@tanstack/react-query";
import { ErrorType } from "../api/axios";
import { ExistsLoginToken422, ExistsLoginToken500 } from "../types/existsLogin.types";
import { existsLoginToken } from "../api/existsLogin";
import { TFormData } from "@/domain/schemas/login-email";

// export const getExistsLoginTokenMutationOptions = <TError = ErrorType<void | ExistsLoginToken422 | ExistsLoginToken500>, TContext = unknown>(options?: {
//     mutation?: UseMutationOptions<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string }, TContext>;
// }): UseMutationOptions<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string }, TContext> => {
//     const { mutation: mutationOptions } = options ?? {};

//     const mutationFn: MutationFunction<Awaited<ReturnType<typeof existsLoginToken>>, { email: string }> = (props) => {
//         const { email } = props ?? {};

//         return existsLoginToken(email);
//     };

//     return { mutationFn, ...mutationOptions };
// };

// // /**
// //  * @summary Verificação de existência deste usuário
// //  */
// export const useExistsLoginToken = <TError = ErrorType<void | ExistsLoginToken422 | ExistsLoginToken500>, TContext = unknown>(options?: {
//     mutation?: UseMutationOptions<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string }, TContext>;
// }): UseMutationResult<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string }, TContext> => {
//     const mutationOptions = getExistsLoginTokenMutationOptions(options);

//     return useMutation(mutationOptions);
// };


export const getExistsLoginTokenMutationOptions = <TError = ErrorType<void | ExistsLoginToken422 | ExistsLoginToken500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string; setError: TFormData["setError"] }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string; setError: TFormData["setError"] }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof existsLoginToken>>, { email: string; setError: TFormData["setError"] }> = (props) => {
        const { email } = props ?? {};

        return existsLoginToken(email);
    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Verificação de existência deste usuário
 */
export const useExistsLoginToken = <TError = ErrorType<void | ExistsLoginToken422 | ExistsLoginToken500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string; setError: TFormData["setError"] }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof existsLoginToken>>, TError, { email: string; setError: TFormData["setError"] }, TContext> => {
    const mutationOptions = getExistsLoginTokenMutationOptions(options);

    return useMutation(mutationOptions);
};

