// import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
// import { HttpDeleteParams } from '@/data/protocols/http/http-delete-client';
// import { HttpHeadParams } from '@/data/protocols/http/http-head-client';
// import axios from 'axios';

// export class AxiosHttpClient<T, R>  implements HttpPostClient<T, R> {
//     async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
//        const httpResponse = await axios.post(params.url, params.body)
//        return {
//         statusCode: httpResponse.status,
//         body: httpResponse.data
//        }
//     }

//     async head(params: HttpHeadParams<T>): Promise<HttpResponse<R>> {
//         const httpResponse = await axios.head(params.url);
//         return {
//             statusCode: httpResponse.status,
//             body: httpResponse.data
//         };
//     }

//     async delete(params: HttpDeleteParams<T>): Promise<HttpResponse<R>> {
//         const httpResponse = await axios.delete(params.url);
//         return {
//             statusCode: httpResponse.status,
//             body: httpResponse.data
//         };
//     }
//   }



// import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-client'
// import axios, { AxiosResponse } from 'axios'

// export class AxiosHttpClient implements HttpClient {
//   async request (data: HttpRequest): Promise<HttpResponse> {
//     let axiosResponse: AxiosResponse
//     try {
//       axiosResponse = await axios.request({
//         url: data.url,
//         method: data.method,
//         data: data.body,
//         headers: data.headers
//       })
//     } catch (error: any) {
//       axiosResponse = error.response
//     }
//     return {
//       statusCode: axiosResponse.status,
//       body: axiosResponse.data
//     }
//   }
// }

import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-client'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error: any) {
      if (error.response) {
        axiosResponse = error.response;
      } else {
        // Trata erros que não são de resposta HTTP, como erros de rede
        return {
          statusCode: HttpStatusCode.serverError,
          body: null
        };
      }
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
