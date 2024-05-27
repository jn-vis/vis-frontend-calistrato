import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client';
import { DeleteVagas } from '@/domain/vagas/usecases/delete-vagas';

export class RemoteDeleteVagas implements DeleteVagas {
    constructor(private readonly url: string, private readonly httpClient: HttpClient<DeleteVagas.Model[]>) {}

    async deleteVaga(): Promise<DeleteVagas.Model[]> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'delete',
        });
        const remoteDeleteVagas = httpResponse.body || [];
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return remoteDeleteVagas
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
