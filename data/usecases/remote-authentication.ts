import { HttpClient, HttpStatusCode } from '../protocols/http/http-client';
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { Authentication } from "@/domain/usecases/authentication";


export class RemoteAuthentication implements Authentication {
    constructor(private readonly url: string,private readonly httpClient: HttpClient<Authentication.Model>) {}


    async login(params: Authentication.Params):Promise<Authentication.Model> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
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


export namespace RemoteAuthentication {
    export type Model = Authentication.Model
}


