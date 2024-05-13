
import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { HttpPostClient,HttpStatusCode} from "@/data/protocols/http";
import { InvalidCredentialsError,UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { TokenPasswordRepository, TokenPasswordParams } from "@/domain/usecases/token-password";


export class RemoteTokenPassword implements TokenPasswordRepository {
    constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient<TokenPasswordParams, AccountModel>) {}


    async tokenPassword(params: TokenPasswordParams):Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}/password`;
        const httpResponse = await this.httpPostClient.post({
            url: fullUrl,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return { status: httpResponse.statusCode, data: httpResponse.body };
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
