import { EmailExistsRepository, EmailParams } from "@/domain/usecases/exists-email";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { HttpHeadClient } from "../protocols/http/http-head-client";

export class RemoteEmailExists implements EmailExistsRepository {
    constructor(private readonly url: string, private readonly httpHeadClient: HttpHeadClient<EmailParams, any>) {}

    async email(params: EmailParams): Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}/token`;
        const httpResponse = await this.httpHeadClient.head({
            url: fullUrl,
        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return { status: HttpStatusCode.ok, data: httpResponse.body };
            case HttpStatusCode.created:
                return { status: HttpStatusCode.created, data: httpResponse.body };
            case HttpStatusCode.accepted:
                return { status: HttpStatusCode.accepted, data: httpResponse.body };
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
