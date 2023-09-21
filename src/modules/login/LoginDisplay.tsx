/**
 * 로그인 화면
 * @author 김선규
 */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
// import axios from 'axios';
import Logo from './img/SurveyLogo.png';
import LoginFig from './img/LoginFig.png';
import LoginNaver from './LoginNaver';

/**
 * @returns LoginDispay
 */
function LoginDisplay() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // 로그인 페이지 접근 url에 flag와 token을 확인하고
    // 첫 로그인 시 프로필 모달을 띄워 해당 데이터와 함께 회원가입
    // 기존 회원일 시 서버에서 메인 페이지 접근을 함
    const flag = searchParams.get('flag');

    if (flag) {
      console.log('good');

      // TODO : 프로필 모달 띄우기

      // TODO : axois로 회원 insert
    }
  }, []);

  const goLogin = () => {
    console.log('nono');
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
