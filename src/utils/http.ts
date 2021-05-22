import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { message } from 'antd';

interface ResponseType {
  msg?: string;
  data?: unknown;
  code?: number;
}

const msg = new Map([[405, '请求类型错误']]);
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  validateStatus: () => true,
});
instance.interceptors.request.use(
  (config) => {
    const Authorization = sessionStorage.getItem('uid')
      ? `Bearer ${sessionStorage.getItem('uid')}`
      : null;
    Reflect.set(config.headers, 'Authorization', Authorization);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      message.error(msg.get(response.status)).then();
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function http(config: AxiosRequestConfig): Promise<ResponseType> {
  return instance(config);
}

export default http;
