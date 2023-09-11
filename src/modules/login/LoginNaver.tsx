// 네이버 로그인 JDK 사용로직
import React, { useEffect } from 'react';

const naverClientId = process.env.NAVER_CLIENT_ID ;
const naverRedirectURL = process.env.NAVER_REDIRECT_URL;
const naverSecret = process.env.NAVER_SECRET;

console.log("sdfdsf"+naverClientId);

const { naver } = window as any;

const LoginNaver = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'ukwEecKhMrJzOdjwpJfB',
      callbackUrl: 'http://localhost:3000/',
      clientSecret: 'MKzp4oRjtI',
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'green', type: 3, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id='naverIdLogin' />;
};

export default LoginNaver;