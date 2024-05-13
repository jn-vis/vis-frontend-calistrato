import { TokenPasswordRepository } from "../usecases/token-password";


export class TokenPasswordService {
    constructor(private tokenPasswordRepository: TokenPasswordRepository) {}
//TODO tratar erros e entender melhor se vai ser usado esse service mesmo dessa forma
    async token(email: string, token: string, password: string, confirmPassword: string): Promise<any> {
        try {
          const response = await this.tokenPasswordRepository.tokenPassword({ email, token, password, confirmPassword });
          return response;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }
}
