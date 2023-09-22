/**
 * 로그인 화면
 * @author 김선규
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
// import axios from 'axios';
import Logo from './img/SurveyLogo.png';
import LoginFig from './img/LoginFig.png';
import LoginNaver from './LoginNaver';

const emptyBoxSimple = {
  height: 20,
};

/**
 * @returns LoginDispay
 */
function LoginDisplay() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/survey/main');
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${LoginFig})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 550,
          height: 400,
          backgroundColor: '#C2E9FF',
          borderRadius: '10px',
        }}
      >
        <Box sx={emptyBoxSimple}> </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${Logo}`}
            style={{ width: '50px', marginRight: '10px' }}
            alt="로고사라짐ㅠ"
          />
          <h1 style={{ position: 'relative', color: '#9E9E9E' }}>
            {' '}
            NoName Survey
          </h1>
        </Box>
        {/* 임시 지정 공백, 차후 디자인 수정 예정 */}
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoginNaver />
        </Box>

        <Box style={{ height: '50px' }} />

        <h2 style={{ position: 'relative', marginBottom: '1px' }}>
          Nice to See you Again
        </h2>
        <Button
          style={{ position: 'relative', color: '#9E9E9E' }}
          onClick={goLogin}
        >
          비회원으로 로그인
        </Button>
      </Box>
    </Box>
  );
}

export default LoginDisplay;

//
// axios
//   .post('http://localhost:3000', { data: 'success' })
//   .then((response) => {
//     // 서버로부터의 응답 처리
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // 오류 처리
//     console.error(error);
//   });
