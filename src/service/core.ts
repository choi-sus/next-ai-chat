import axios, { AxiosError, AxiosResponse } from 'axios';

const appClient = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

appClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      alert('로그인 시간이 만료되었습니다.');
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default appClient;
