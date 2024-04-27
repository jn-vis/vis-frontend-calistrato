import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { ErrorType } from "../api/axios";
import { executeLogout } from "../api/executeLogout";
import { ExecuteLogout422, ExecuteLogout500 } from "../types/executeLogout.types";

export const getExecuteLogoutMutationOptions = <TError = ErrorType<void | ExecuteLogout422 | ExecuteLogout500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof executeLogout>>, TError, { email: string }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof executeLogout>>, TError, { email: string }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof executeLogout>>, { email: string }> = (props) => {
        const { email } = props ?? {};

        return executeLogout(email);
    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Executar logout no sistema
 */
export const useExecuteLogout = <TError = ErrorType<void | ExecuteLogout422 | ExecuteLogout500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof executeLogout>>, TError, { email: string }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof executeLogout>>, TError, { email: string }, TContext> => {
    const mutationOptions = getExecuteLogoutMutationOptions(options);

    return useMutation(mutationOptions);
};
