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

export default Api;
