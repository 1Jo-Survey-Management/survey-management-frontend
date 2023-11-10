import React, { useState } from 'react';
import config from './config/config.json';
import { Box } from '@mui/system';

const bottonBoxStyle = {
  width: '100%',
};

const webButtonBoxStyle = {
  '@media (minWidth: 800px)': {
    width: '100%',
  },
};

const buttonStyle = {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
};

const imageStyle = {
  width: '60%',
};

const webImageStyle = {
  '@media (minWidth: 800px)': {
    width: '10%',
  },
};

/**
 * 네이버 OAuth 로그인
 * @author 김선규
 * @returns 네이버 로그인 버튼
 */
function LoginNaver() {
  const [isHovered, setIsHovered] = useState(false);

  const handleOAuthLogin = () => {
    const authorizationUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${config.clientId}&state=${config.state}&redirect_uri=${config.redirectUri}`;
    window.location.href = authorizationUrl;
  };

  const getImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/naverhover.png`
      : `${process.env.PUBLIC_URL}/naverButton.png`;

  return (
    <Box sx={{ ...bottonBoxStyle, ...webButtonBoxStyle }}>
      <button
        type="button"
        onClick={handleOAuthLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyle}
      >
        <img
          src={getImageSrc()}
          style={{ ...webImageStyle, ...imageStyle }}
          alt="대체_텍스트"
        />
      </button>
    </Box>
  );
}

export default LoginNaver;
