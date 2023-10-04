/**
 * 로그인 화면
 * @author 김선규
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Logo from './img/SurveyLogo.png';
import LoginFig from './img/LoginFig.png';
import LoginNaver from './LoginNaver';
import Modal from './modal/BasicModal';

const emptyBoxSimple = {
  height: 20,
};

/**
 * @returns LoginDispay
 */
function LoginDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false); // 모달 가시성 상태 추가

  /**
   * 로그인 화면에 AccessToken이 같이 오는 것은 회원가입의 상황밖에 없다
   * 따라서 AccessToken을 같이 받는 즉시 모달창으로 회원가입을 실행한다.
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      console.log('AccessToken:', accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // 모달을 열기 위해 상태를 업데이트합니다.
      setShowModal(true);
    }
  }, [location]);

  // const closeModal = () => {
  //   // 모달을 닫기 위해 상태를 업데이트합니다.
  //   setShowModal(false);
  // };

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

          {showModal && <Modal onClose={() => {}} />}
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
