// import axios from 'axios';
import React, { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import Modal from './modal/BasicModal';

const buttonStyle = {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
};

const imageStyle = {
  width: '40%',
};

/**
 * 네이버 OAuth 로그인
 * @author 김선규
 * @returns 네이버 로그인 버튼
 */
function LoginNaver() {
  const [isHovered, setIsHovered] = useState(false);

  // OAuth 인증 요청 버튼 클릭 핸들러
  const handleOAuthLogin = () => {
    // OAuth 인증 페이지 URL
    const authorizationUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ukwEecKhMrJzOdjwpJfB&state=STATE_STRING&redirect_uri=http://localhost:8080/login/oauth2/code/naver`;

    console.log('sdfsdf');
    // 사용자를 OAuth 인증 페이지로 리디렉션
    window.location.href = authorizationUrl;
  };

  const getImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/naverhover.png`
      : `${process.env.PUBLIC_URL}/naverButton.png`;

  return (
    <div>
      <button
        type="button"
        onClick={handleOAuthLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyle}
      >
        <img src={getImageSrc()} style={imageStyle} alt="대체_텍스트" />
      </button>
      {/* {isModaled && <Modal onClose={() => setIsModaled(false)} />} */}
    </div>
  );
}

export default LoginNaver;
