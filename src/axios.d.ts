import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    showSpinner?: boolean;
  }
}