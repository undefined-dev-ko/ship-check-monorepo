import axios, { AxiosRequestConfig, Method } from 'axios';
import { getBaseApiUrl } from '../util/config';
import { TokenRefreshResponse } from './interfaces';

const client = axios.create({
  baseURL: getBaseApiUrl(),
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // originalRequest._retry = true;

      const { accessToken, refreshToken } = await getNewToken();

      if (!accessToken || !refreshToken) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } else {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return Promise.reject(error);
  },
);

async function getNewToken() {
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
