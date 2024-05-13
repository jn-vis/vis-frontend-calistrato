

import { HttpPostClient, HttpStatusCode} from "@/data/protocols/http";
import { AccountModel } from "@/domain/models";
import { AuthParams, AuthRepository} from "@/domain/usecases/password";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";


export class RemoteAuthentication implements AuthRepository {
    constructor(private readonly url: string,private readonly httpPostClient: HttpPostClient<AuthParams, AccountModel>) {}


    async login(params: AuthParams):Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}`;
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

