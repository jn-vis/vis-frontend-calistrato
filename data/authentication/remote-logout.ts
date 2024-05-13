import { EmailParams } from "@/domain/usecases/exists-email";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { ConfirmEmailRepository } from "@/domain/usecases/confirm-email";
import { DeleteParams, LogoutRepository } from "@/domain/usecases/logout";
import { HttpDeleteClient, HttpDeleteParams } from "../protocols/http/http-delete-client";
import { UnexpectedError } from "@/domain/errors";

export class RemoteLogout implements LogoutRepository {
    constructor(private readonly url: string, private readonly httpDeleteClient: HttpDeleteClient<HttpDeleteParams<DeleteParams>, any>) {}

    async logout(params: DeleteParams): Promise<any> {
        const fullUrl = `${this.url}/login/${params.email}`;
        const httpResponse = await this.httpDeleteClient.delete({
            url: fullUrl,

        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return { status: httpResponse.statusCode };
            default:
                throw new UnexpectedError();
        }
    }
}
