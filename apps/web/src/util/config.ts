type EnvKeys =
  | 'REACT_APP_NODE_ENV'
  | 'REACT_APP_BASE_API_URL'
  | 'REACT_APP_GOOGLE_CLIENT_ID';

const getEnv = (envName: EnvKeys, required = false): string => {
  const result = process.env[envName];
  required &&
    !result &&
    (() => {
      throw new Error(`the environment variable '${envName}' can not be null`);
    })();
  return result as string;
};

export const getBaseApiUrl = () => getEnv('REACT_APP_BASE_API_URL', true);
export const getGoogleClientId = () =>
  getEnv('REACT_APP_GOOGLE_CLIENT_ID', true);
export const getGoogleRedirectURI = () => {
  // ex) http://localhost:3000/auth/google
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';
  return `${protocol}//${hostname}${port}/auth/google`;
};
