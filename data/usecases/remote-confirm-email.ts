
import { ConfirmEmailRepository } from "@/domain/usecases/confirm-email";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "../protocols/http/http-client";

export class RemoteConfirmEmail implements ConfirmEmailRepository {
    constructor(private readonly url: string, private readonly httpClient: HttpClient<ConfirmEmailRepository.Model>) {}

    async confirmEmail(params: ConfirmEmailRepository.Params): Promise<ConfirmEmailRepository.Model> {

        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: params
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
