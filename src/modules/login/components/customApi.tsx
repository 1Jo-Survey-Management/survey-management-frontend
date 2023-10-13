import axios from 'axios';
import { server } from '../config/config.json';
import { refresh } from '../components/RefreshToken';

/**
 * intercepter를 통하여 토큰 만료시 refreshToken으로 자동 갱신하기 위한 axois 커스텀 컴포넌트입니다
 * @author 김선규
 */
const Api = axios.create({
  baseURL: server,
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use(refresh);

export default Api;
