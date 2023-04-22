import axios, { AxiosError } from 'axios';

const instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      alert('로그인 시간이 만료되었습니다.');
      window.location.href = '/';

      return;
    }

    return Promise.reject(error);
  },
);

export default instance;
