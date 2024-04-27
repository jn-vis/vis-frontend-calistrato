import { ErrorType } from "../api/axios";
import { createLoginToken } from "../api/createLoginToken";

export type CreateLoginToken500 = { [key: string]: { [key: string]: any } };

export type CreateLoginToken422 = { [key: string]: { [key: string]: any } };


export type CreateLoginTokenMutationResult = NonNullable<Awaited<ReturnType<typeof createLoginToken>>>;

export type CreateLoginTokenMutationError = ErrorType<void | CreateLoginToken422 | CreateLoginToken500>;
