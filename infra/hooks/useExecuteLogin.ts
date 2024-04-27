import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { ErrorType } from "../api/axios";
import { executeLogin } from "../api/executeLogin";
import { ExecuteLogin422, ExecuteLogin500, ExecuteLoginParams } from "../types/executeLogin.types";

export const getExecuteLoginMutationOptions = <TError = ErrorType<void | ExecuteLogin422 | ExecuteLogin500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof executeLogin>>, TError, { email: string; data: string; params?: ExecuteLoginParams }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof executeLogin>>, TError, { email: string; data: string; params?: ExecuteLoginParams }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof executeLogin>>, { email: string; data: string; params?: ExecuteLoginParams }> = (props) => {
        const { email, data, params } = props ?? {};

        return executeLogin(email, data, params);
    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Executar Login
 */
export const useExecuteLogin = <TError = ErrorType<void | ExecuteLogin422 | ExecuteLogin500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof executeLogin>>, TError, { email: string; data: string; params?: ExecuteLoginParams }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof executeLogin>>, TError, { email: string; data: string; params?: ExecuteLoginParams }, TContext> => {
    const mutationOptions = getExecuteLoginMutationOptions(options);

    return useMutation(mutationOptions);
};
