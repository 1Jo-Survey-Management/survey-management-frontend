import { Box } from '@mui/material';
import React, { useState } from 'react';

// const webButtonBoxStyle = {
//   '@media (minWidth: 800px)': {
//     width: '100%',
//   },
// };

/**
 * 네이버 OAuth 로그인
 * @author 김선규
 * @returns 네이버 로그인 버튼
 */
function LoginNaver() {
  const [isHovered, setIsHovered] = useState(false);

  const handleOAuthLogin = () => {
    const authorizationUrl = `${process.env.REACT_APP_NAVER_OAUTH_BASE_URL}?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
    window.location.href = authorizationUrl;
  };

  const getImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/naverhover.png`
      : `${process.env.PUBLIC_URL}/naverButton.png`;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <button
        type="button"
        onClick={handleOAuthLogin}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: `url(${getImageSrc()})`,
          backgroundColor: '#ffffff',
          border: '0px solid #000',
          borderRadius: '10px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '200px',
          height: '50px',
          cursor: 'pointer',
        }}
      >
        {}
      </button>
    </Box>
  );
}

export default LoginNaver;
