// domain/services/LoginService.ts

import { LogoutRepository } from "../usecases/logout";


export class LogoutService {
    constructor(private logoutRepository: LogoutRepository) {}
//TODO tratar erros e entender melhor se vai ser usado esse service mesmo dessa forma
    async verifyEmailDelete(email: string): Promise<any> {
        try {
          const response = await this.logoutRepository.logout({ email });
          return response;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }
}
