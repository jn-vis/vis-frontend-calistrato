import { EmailParams } from "./exists-email";

export interface ConfirmEmailRepository {
    confirmEmail(params: EmailParams): Promise<any>;
}
