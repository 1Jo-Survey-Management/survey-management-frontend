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
    const accessToken = response.data.accessToken;

    if (accessToken != null) {
      console.log('응답 인터셉터에서 갱신할 accessToken : ' + accessToken);
      localStorage.setItem('accessToken', accessToken);
      Api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log('갱신할 토큰 없음');
    }

    return response; // 이 부분에서 변경된 응답을 반환할 수도 있습니다
  },
  (error) => {
    // 오류 응답을 받았을 때 실행할 코드
    // error 변수는 에러 응답을 나타냅니다
    // 예를 들어, 에러 처리 또는 로깅 등을 수행할 수 있습니다

    return Promise.reject(error);
  }
);

export default Api;
