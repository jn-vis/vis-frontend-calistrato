import { EmailExistsRepository} from "@/domain/usecases/exists-email";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { HttpClient, HttpStatusCode } from "../protocols/http/http-client";

export class RemoteEmailExists implements EmailExistsRepository {
    constructor(private readonly url: string, private readonly httpClient: HttpClient<EmailExistsRepository.Model>) {}

    async email(params: EmailExistsRepository.Params): Promise<EmailExistsRepository.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'head',
            body: params
        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return { status: HttpStatusCode.ok, data: httpResponse.body };
            case HttpStatusCode.created:
                return { status: HttpStatusCode.created, data: httpResponse.body };
            case HttpStatusCode.accepted:
                return { status: HttpStatusCode.accepted, data: httpResponse.body };
            case HttpStatusCode.notFound:
                return { status: HttpStatusCode.notFound, data: httpResponse.body };
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
