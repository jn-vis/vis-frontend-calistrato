import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { ErrorType } from "../api/axios";
import { CreateLoginToken422, CreateLoginToken500 } from "../types/createLoginToken.types";
import { createLoginToken } from "../api/createLoginToken";
import { createTokenLanguage } from "../api/createTokenLanguage";


export const getCreateTokenLanguageMutationOptions = <TError = ErrorType<void | CreateLoginToken422 | CreateLoginToken500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createTokenLanguage>>, TError, { email: string; language: string }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof createTokenLanguage>>, TError, { email: string; language: string }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof createTokenLanguage>>, { email: string; language: string }> = (props) => {
        const { email, language } = props ?? {};

        return createTokenLanguage(email, language);
    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Criar token para gerenciamento de senha
 */
export const useCreateTokenLanguage = <TError = ErrorType<void | CreateLoginToken422 | CreateLoginToken500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createTokenLanguage>>, TError, { email: string; language: string }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof createTokenLanguage>>, TError, { email: string; language: string }, TContext> => {
    const mutationOptions = getCreateTokenLanguageMutationOptions(options);

    return useMutation(mutationOptions);
};
