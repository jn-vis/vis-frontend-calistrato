// domain/services/LoginService.ts

import { EmailExistsRepository } from "../usecases/exists-email";
import { TokenLanguageParams, TokenLanguageRepository } from "../usecases/token-language";


export class TokenLanguageService {
    constructor(private tokenLanguageRepository: TokenLanguageRepository) {}
//TODO tratar erros e entender melhor se vai ser usado esse service mesmo dessa forma
    async token(email: string, language: string): Promise<any> {
        try {
          const response = await this.tokenLanguageRepository.tokenLanguage({ email, language });
          return response;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }
}
