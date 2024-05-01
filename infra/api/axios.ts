import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import swagger from '../../swagger.json';

const servers = swagger.servers;

const API_BASE_URL = servers && servers.length > 0 ? servers[0]?.url : 'http://localhost:8080';

export const AxiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const source = Axios.CancelToken.source();

    const promise = AxiosInstance({
      ...config,
      cancelToken: source.token,
    });

    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled');
    };

    return promise;
  }

export type ErrorType<Error> = AxiosError<Error>;
