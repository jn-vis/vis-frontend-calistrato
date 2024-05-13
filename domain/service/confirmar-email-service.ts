// domain/services/LoginService.ts

import { ConfirmEmailRepository } from "../usecases/confirm-email";
import { EmailExistsRepository } from "../usecases/exists-email";


export class ConfirmEmailService {
    constructor(private confirmEmailRepository: ConfirmEmailRepository) {}

    async verifyConfirmEmail(email: string): Promise<any> {
        try {

            const response = await this.confirmEmailRepository.confirmEmail({ email });

            return response;
        } catch (error) {
            console.error('Error verifying Confirm email:', error);
            throw error;
        }
    }
}
