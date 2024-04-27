import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { ErrorType } from "../api/axios";
import { savePreRegistration } from "../api/savePreRegistration";
import { SavePreRegistration422, SavePreRegistration500 } from "../types/savePreRegistration.types";

export const getSavePreRegistrationMutationOptions = <TError = ErrorType<void | SavePreRegistration422 | SavePreRegistration500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof savePreRegistration>>, TError, { email: string; data: string }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof savePreRegistration>>, TError, { email: string; data: string }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof savePreRegistration>>, { email: string; data: string }> = (props) => {
        const { email, data } = props ?? {};

        return savePreRegistration(email, data);
    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Salvar pré registro
 */
export const useSavePreRegistration = <TError = ErrorType<void | SavePreRegistration422 | SavePreRegistration500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof savePreRegistration>>, TError, { email: string; data: string }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof savePreRegistration>>, TError, { email: string; data: string }, TContext> => {
    const mutationOptions = getSavePreRegistrationMutationOptions(options);

    return useMutation(mutationOptions);
};
