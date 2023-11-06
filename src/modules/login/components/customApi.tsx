import axios from 'axios';
import config from '../config/config.json';

/**
 * intercepter를 통하여 토큰 만료시 refreshToken으로 자동 갱신하기 위한 axois 커스텀 컴포넌트입니다
 * @author 김선규
 */
const Api = axios.create({
  baseURL: config.server,
  timeout: 10000,
  params: {},
});

// 응답 인터셉터를 설정
Api.interceptors.response.use(
  (response) => {
    const accessToken = response.config.headers.Authorization;

    if (typeof accessToken === 'string') {
      const token = accessToken.split(' ')[1];

      console.log('응답 객체좀 보자 : ' + JSON.stringify(response, null, 2));

      if (token != null) {
        console.log('응답 인터셉터에서 갱신할 accessToken : ' + token);
        localStorage.setItem('accessToken', token);
        Api.defaults.headers.common.Authorization = accessToken;
      } else {
        console.log('갱신할 토큰 없음');
      }
    }

    return response;
  },
  (error) => {
    console.error('customApi interceptor reponse error!');
    return Promise.reject(error);
  }
);

export default Api;
