import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client';
import { ViewVagas } from '@/domain/vagas/usecases/view-vagas';

export class RemoteViewVagas implements ViewVagas {
    constructor(private readonly url: string, private readonly httpClient: HttpClient<ViewVagas.Model[]>) {}

    async findAll(): Promise<ViewVagas.Model[]> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
        });
        const remoteVagas = httpResponse.body || [];
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return remoteVagas.map((remoteVaga) => ({
                    ...remoteVaga,
                }));
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
