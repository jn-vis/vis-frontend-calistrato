import { MutationFunction, UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/updatePassword";
import { ErrorType } from "../api/axios";
import { UpdatePassword422, UpdatePassword500, UpdatePasswordParams } from "../types/updatePassword.types";

export const getUpdatePasswordMutationOptions = <TError = ErrorType<void | UpdatePassword422 | UpdatePassword500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePassword>>, TError, { email: string; data: string; params?: UpdatePasswordParams }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof updatePassword>>, TError, { email: string; data: string; params?: UpdatePasswordParams }, TContext> => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<Awaited<ReturnType<typeof updatePassword>>, { email: string; data: string; params?: UpdatePasswordParams }> = (props) => {
        const { email, data, params } = props ?? {};

        return updatePassword(email, data, params);
    };

    return { mutationFn, ...mutationOptions };
};

/**
 * @summary Salvamento de senha
 */
export const useUpdatePassword = <TError = ErrorType<void | UpdatePassword422 | UpdatePassword500>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updatePassword>>, TError, { email: string; data: string; params?: UpdatePasswordParams }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof updatePassword>>, TError, { email: string; data: string; params?: UpdatePasswordParams }, TContext> => {
    const mutationOptions = getUpdatePasswordMutationOptions(options);

    return useMutation(mutationOptions);
};
