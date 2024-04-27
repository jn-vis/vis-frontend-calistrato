import { ErrorType } from "../api/axios";
import { existsLoginToken } from "../api/existsLogin";

export type ExistsLoginToken500 = { [key: string]: { [key: string]: any } };
export type ExistsLoginToken422 = { [key: string]: { [key: string]: any } };

export type ExistsLoginTokenMutationResult = NonNullable<Awaited<ReturnType<typeof existsLoginToken>>>;

export type ExistsLoginTokenMutationError = ErrorType<void | ExistsLoginToken422 | ExistsLoginToken500>;
