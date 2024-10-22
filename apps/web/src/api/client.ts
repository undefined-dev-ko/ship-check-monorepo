import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { getBaseApiUrl } from '../util/config';
import { TokenRefreshResponse } from './interfaces';

const client = axios.create({
  baseURL: getBaseApiUrl(),
});

client.interceptors.response.use((response) => {
  return response;
}, axiosErrorHandler);

async function axiosErrorHandler(error: AxiosError<unknown>) {
  if (error.response?.status === 401) {
    const newTokenPair = await getNewToken();
    const { accessToken, refreshToken } = newTokenPair || {};

    if (!accessToken || !refreshToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } else {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    // 새로운 토큰으로 재시도해서 query를 재실행 @see https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise
    if (error.config) {
      error.config.headers['Authorization'] = `Bearer ${accessToken}`;
      error.config.baseURL = undefined;
      return client.request(error.config);
    }
  }

  return Promise.reject(error);
}

async function getNewToken(): Promise<TokenRefreshResponse | null> {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return null;
  }

  try {
    const { data } = await axios.post<TokenRefreshResponse>(
      `${getBaseApiUrl()}/auth/refresh`,
      {
        accessToken,
        refreshToken,
      },
    );

    return data;
  } catch (e) {
    return null;
  }
}

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
