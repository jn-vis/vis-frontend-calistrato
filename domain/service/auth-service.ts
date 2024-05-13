import { AuthRepository } from "../usecases/password";


export class AuthService {
    constructor(private authRepository: AuthRepository) {}
//TODO tratar erros e entender melhor se vai ser usado esse service mesmo dessa forma
    async auth(email: string, password: string): Promise<any> {
        try {
          const response = await this.authRepository.login({ email, password });
          return response;
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }
}
