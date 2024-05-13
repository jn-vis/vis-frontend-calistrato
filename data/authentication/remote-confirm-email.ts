import { EmailParams } from "@/domain/usecases/exists-email";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { ConfirmEmailRepository } from "@/domain/usecases/confirm-email";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";

export class RemoteConfirmEmail implements ConfirmEmailRepository {
    constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient<EmailParams, any>) {}

    async confirmEmail(params: EmailParams): Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}/token`;
        const httpResponse = await this.httpPostClient.post({
            url: fullUrl,
        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.accepted:
                return { status: httpResponse.statusCode };
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            case HttpStatusCode.badRequest:
                throw new Error('E-mail inválido');
            case HttpStatusCode.forbidden:
                throw new Error('Token bloqueado');
            case HttpStatusCode.conflict:
                throw new Error('Usuário já logado no sistema');
            default:
                throw new UnexpectedError();
        }
    }
}
