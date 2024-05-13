
import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { HttpPostClient,HttpStatusCode} from "@/data/protocols/http";
import { InvalidCredentialsError,UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { TokenPasswordParams } from "@/domain/usecases/token-password";
import { TokenLanguageParams, TokenLanguageRepository } from "@/domain/usecases/token-language";


export class RemoteTokenLanguage implements TokenLanguageRepository {
    constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient<TokenLanguageParams, any>) {}


    async tokenLanguage(params: TokenLanguageParams):Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}/token/language/${params.language}`;
        const httpResponse = await this.httpPostClient.post({
            url: fullUrl,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return { status: httpResponse.statusCode };
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
