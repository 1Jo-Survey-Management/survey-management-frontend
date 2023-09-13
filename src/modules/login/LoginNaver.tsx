// 네이버 로그인 JDK 사용로직
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const naverClientId = "ukwEecKhMrJzOdjwpJfB" ;
const naverRedirectURL = "http://localhost:8080/login/naver/callback";
//CSRF를 방지하기 위한 인증값, 사용자임의로 넣어야하고, 테스트를 위해 test로 설정
const naverstate = "test";

// const { naver } = window as any;


const LoginNaver = () => {

  // 이미지가 호버 상태인지 여부를 관리하기 위한 상태 변수
const [isHovered, setIsHovered] = useState(false);

// 호버 상태에 따라 이미지 경로를 정의하는 함수
const getImageSrc = () => (isHovered ? process.env.PUBLIC_URL + '/naverhover.png' : process.env.PUBLIC_URL + '/naverButton.png' );
  
const handleNaverLogin = ()=> {

  // 네이버 OAuth 인증 페이지로 리다이렉트
   window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverstate}&redirect_uri=${naverRedirectURL}`;
  
};

  return (
    <div>
<img
  src= {getImageSrc()}
  style={{ width: '40%'}} 
  alt="대체_텍스트"
  onClick={handleNaverLogin}
  onMouseEnter={() => setIsHovered(true)} // 마우스를 호버하면 호버 상태로 설정
  onMouseLeave={() => setIsHovered(false)} // 마우스를 떠나면 호버 상태 해제
/>
    </div>
  );


};

export default LoginNaver;