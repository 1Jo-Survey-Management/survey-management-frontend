/**
 * 네이버 로그인 JDK 사용로직
 * @author 김선규
 */
import React, { useState } from 'react';

const naverClientId = 'ukwEecKhMrJzOdjwpJfB';
const naverRedirectURL = 'http://localhost:8080/login/naver/callback';

/**
 * CSRF를 방지하기 위한 인증값, 사용자임의로 넣어야하고, 테스트를 위해 test로 설정
 */
const naverstate = 'test';

/**
 * 네이버 OAuth 인증 페이지로 리다이렉트
 */
const handleNaverLogin = () => {
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverstate}&redirect_uri=${naverRedirectURL}`;
};

/**
 * 네이버 OAuth 로그인 입니다.
 * @returns LoginNaver
 */
function LoginNaver() {
  const [isHovered, setIsHovered] = useState(false);

  const getImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/naverhover.png`
      : `${process.env.PUBLIC_URL}/naverButton.png`;

  return (
    <div>
      <button
        type="button"
        onClick={handleNaverLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <img src={getImageSrc()} style={{ width: '40%' }} alt="대체_텍스트" />
      </button>
    </div>
  );
}

export default LoginNaver;
