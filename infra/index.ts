import axios from 'axios';

import { responseInterceptor, errorInterceptor } from './pipes';
import { Environment } from './env';


const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };
