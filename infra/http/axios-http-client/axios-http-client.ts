import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
import { HttpDeleteParams } from '@/data/protocols/http/http-delete-client';
import { HttpHeadParams } from '@/data/protocols/http/http-head-client';
import axios from 'axios';

export class AxiosHttpClient<T, R>  implements HttpPostClient<T, R> {
    async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
       const httpResponse = await axios.post(params.url, params.body)
       return {
        statusCode: httpResponse.status,
        body: httpResponse.data
       }
    }

    async head(params: HttpHeadParams<T>): Promise<HttpResponse<R>> {
        const httpResponse = await axios.head(params.url);
        return {
            statusCode: httpResponse.status,
            body: httpResponse.data
        };
    }

    async delete(params: HttpDeleteParams<T>): Promise<HttpResponse<R>> {
        const httpResponse = await axios.delete(params.url);
        return {
            statusCode: httpResponse.status,
            body: httpResponse.data
        };
    }
  }


