import axios, { InternalAxiosRequestConfig } from 'axios';
import moment from 'moment';

/**
 * 토큰이 만료되었을때 interceptor를 통하여 자동으로 갱신해주는 컴포넌트입니다.
 * @param config
 * @returns config
 */
const refresh = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const expireAt = localStorage.getItem('expiresIn');
  let accessToken = localStorage.getItem('accessToken');
  const oldAccessToken = localStorage.getItem('accessToken');

  if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
    const body = {
      refreshToken,
      oldAccessToken,
    };

    try {
      const response = await axios.post(`/login/refreshtoken`, body);
      const { data } = response;

      if (data && data.content.accessToken) {
        accessToken = data.content.accessToken;
        localStorage.setItem('accessToken', data.content.accessToken);
        const expiresIn = moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
        localStorage.setItem('expiresIn', expiresIn);
      } else {
        throw new Error('토큰 갱신에 실패했습니다.');
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      throw error;
    }
  }

  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export { refresh };
