import { ErrorType } from "../api/axios";
import { executeLogout } from "../api/executeLogout";

export type ExecuteLogout500 = { [key: string]: { [key: string]: any } };

export type ExecuteLogout422 = { [key: string]: { [key: string]: any } };

export type ExecuteLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof executeLogout>>>;

export type ExecuteLogoutMutationError = ErrorType<void | ExecuteLogout422 | ExecuteLogout500>;
