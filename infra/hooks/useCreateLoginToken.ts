import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { ErrorType } from "../api/axios";
import { CreateLoginToken422, CreateLoginToken500 } from "../types/createLoginToken.types";
import { createLoginToken } from "../api/createLoginToken";


export const getCreateLoginTokenMutationOptions = <TError = ErrorType<void | CreateLoginToken422 | CreateLoginToken500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLoginToken>>, TError, { email: string; language: string }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof createLoginToken>>, TError, { email: string; language: string }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof createLoginToken>>, { email: string; language: string }> = (props) => {
        const { email, language } = props ?? {};

        // return createLoginToken(email, language);
        return createLoginToken(email);

    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Criar token para gerenciamento de senha
 */
export const useCreateLoginToken = <TError = ErrorType<void | CreateLoginToken422 | CreateLoginToken500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createLoginToken>>, TError, { email: string; language: string }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof createLoginToken>>, TError, { email: string; language: string }, TContext> => {
    const mutationOptions = getCreateLoginTokenMutationOptions(options);

    return useMutation(mutationOptions);
};
