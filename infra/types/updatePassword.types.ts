import { AxiosResponse } from "axios";
import { ErrorType } from "../api/axios";

export type UpdatePasswordParams = {
    wordsHash?: string;
};

export type UpdatePassword500 = { [key: string]: { [key: string]: any } };

export type UpdatePassword422 = { [key: string]: { [key: string]: any } };


export type UpdatePasswordMutationResult = NonNullable<AxiosResponse<{ sessionToken: string }, any>>;
export type UpdatePasswordMutationBody = string;
export type UpdatePasswordMutationError = ErrorType<void | UpdatePassword422 | UpdatePassword500>;
