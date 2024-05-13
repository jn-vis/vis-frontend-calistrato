// domain/services/LoginService.ts

import { EmailExistsRepository } from "../usecases/exists-email";


export class EmailService {
    constructor(private emailExistsRepository: EmailExistsRepository) {}
//TODO tratar erros e entender melhor se vai ser usado esse service mesmo dessa forma
    async verifyEmail(email: string): Promise<any> {
        try {
          const response = await this.emailExistsRepository.email({ email });
          return response;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }
}
