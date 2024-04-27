import { ErrorType } from "../api/axios";
import { executeLogin } from "../api/executeLogin";

export type ExecuteLogin500 = { [key: string]: { [key: string]: any } };

export type ExecuteLogin422 = { [key: string]: { [key: string]: any } };

export type ExecuteLoginParams = {
    wordsHash?: string;
};


export type ExecuteLoginMutationResult = NonNullable<Awaited<ReturnType<typeof executeLogin>>>;
export type ExecuteLoginMutationBody = string;
export type ExecuteLoginMutationError = ErrorType<void | ExecuteLogin422 | ExecuteLogin500>;
