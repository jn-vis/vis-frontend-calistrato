import { HttpPostClient,HttpStatusCode} from "@/data/protocols/http";
import { InvalidCredentialsError,UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { TokenPasswordParams } from "@/domain/usecases/token-password";
import { TokenLanguageParams, TokenLanguageRepository } from "@/domain/usecases/token-language";
import { PreRegistrationParams, PreRegistrationRepository } from "@/domain/usecases/pre-registration";


export class RemotePreRegistration implements PreRegistrationRepository {
    constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient<PreRegistrationParams, any>) {}


    async registration(params: PreRegistrationParams):Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}/pre-registration`;
        const httpResponse = await this.httpPostClient.post({
            url: fullUrl,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.accepted:
                return { status: httpResponse.statusCode };
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
