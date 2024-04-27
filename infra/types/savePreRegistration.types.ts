import { ErrorType } from "../api/axios";
import { savePreRegistration } from "../api/savePreRegistration";

export type SavePreRegistration500 = { [key: string]: { [key: string]: any } };

export type SavePreRegistration422 = { [key: string]: { [key: string]: any } };


export type SavePreRegistrationMutationResult = NonNullable<Awaited<ReturnType<typeof savePreRegistration>>>;
export type SavePreRegistrationMutationBody = string;
export type SavePreRegistrationMutationError = ErrorType<void | SavePreRegistration422 | SavePreRegistration500>;
