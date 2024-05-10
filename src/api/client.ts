import axios, { AxiosRequestConfig, Method } from 'axios';
import { getBaseApiUrl } from '../util/config';

const client = axios.create({
  baseURL: getBaseApiUrl(),
});

async function sendRequest(options: SendRequestOptions) {
  const headers: {
    authorization?: string;
  } = {};

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  const config: AxiosRequestConfig = {
    method: options.method,
    params: options.params,
    url: options.path,
    data: options.data,
    headers,
    responseType: options.responseType,
  };
  return client(config);
}

export type SendRequestOptions = {
  method: Method;
  path: string;
  params?: any;
  data?: { [key: string]: any };
  responseType?: 'json';
};

export { client, sendRequest };
