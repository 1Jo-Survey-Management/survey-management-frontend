import axios from 'axios';
/**
 * intercepter를 통하여 토큰 만료시 refreshToken으로 자동 갱신하기 위한 axois 커스텀 컴포넌트입니다
 * @author 김선규
 */
const Api = axios.create({
  params: {},
});

// 요청 인터셉터
Api.interceptors.request.use(
  // eslint-disable-next-line no-shadow
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 응답 인터셉터를 설정
Api.interceptors.response.use(
  (response) => {
    const accessToken = response.config.headers.Authorization;

    if (typeof accessToken === 'string') {
      const token = accessToken.split(' ')[1];

      if (token != null) {
        localStorage.setItem('accessToken', token);
        Api.defaults.headers.common.Authorization = accessToken;
      } else {
        console.log('갱신할 토큰 없음');
      }
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default Api;
