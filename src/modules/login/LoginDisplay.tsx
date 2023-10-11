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
// import LoginNaver from './LoginNaver';
// import Modal from './modal/BasicModal';
import BasicModal from './modal/BasicModal';

const emptyBoxSimple = {
  height: 20,
};

const emptyBox = {
  height: '50px',
};

const basicBox = {
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
};

const secBasicBox = {
  width: 550,
  height: 400,
  backgroundColor: '#C2E9FF',
  borderRadius: '10px',
};

const loginBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const imageSx = {
  width: '50px',
  marginRight: '10px',
};

const naverloginButton = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const guestLogin = {
  position: 'relative',
  color: '#9E9E9E',
};

const buttonStyle = {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
};

const imageStyle = {
  width: '40%',
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
    const accessCode = searchParams.get('code');

    const redirectUri = 'http://localhost:8080/login/oauth2/code/naver';

    console.log('accessCode : ' + accessCode);

    if (accessCode) {
      axios
        .get(redirectUri, {
          params: {
            code: accessCode,
            state: 'STATE_STRING',
          },
        })
        .then((response) => {
          // code 보내서 백에서 인증하고 미완료회원 객체 가져옴(메일, accessToken)
          const responseCheck = response;
          console.log('responseCheck:', responseCheck);
          const responseUserNo = responseCheck.data.content.userNo;
          const responseAccessToken = responseCheck.data.content.accessToken;
          const responseNickName = responseCheck.data.content.userNickname;
          const localStorageAccessToken = localStorage.getItem('accessToken');

          // 여기서도 분기를 만들어줘야함.
          // 1. 완료된 회원
          if (responseUserNo != null && responseNickName != null) {
            // 회원은 존재하나 브라우저에서 로그인 한적이 없는 회원
            if (
              localStorageAccessToken == null ||
              responseAccessToken !== localStorageAccessToken
            ) {
              // accessToken localStrage에 저장하기
              localStorage.setItem('accessToken', responseAccessToken);

              // axois default header에 넣기(Global)
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + responseAccessToken;
              responseAccessToken;

              console.log(
                '로컬스토리지 accessToken 확인 : ' +
                  localStorage.getItem('accessToken')
              );

              navigate('/survey/main');
            }

            // 현 브라우저에서 로그인 한적이 있어 localStorage에 토큰이 있는 회원
            if (responseAccessToken === localStorageAccessToken) {
              navigate('/survey/main');
            }
          }

          // 2. 첫 로그인 시
          if (responseUserNo != null) {
            // accessToken localStrage에 저장하기
            localStorage.setItem('accessToken', responseAccessToken);

            console.log(
              '로컬스토리지 accessToken 확인 : ' +
                localStorage.getItem('accessToken')
            );

            // axois default header에 넣기(Global)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + responseAccessToken;
            responseAccessToken;

            setShowModal(true);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      console.log('몇번요청됐나');
    }
  }, []);

  const goLogin = () => {
    navigate('/survey/main');
  };

  const [isHovered, setIsHovered] = useState(false);

  // OAuth 인증 요청 버튼 클릭 핸들러
  const handleOAuthLogin = () => {
    // OAuth 인증 페이지 URL
    const authorizationUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=ukwEecKhMrJzOdjwpJfB&state=STATE_STRING&redirect_uri=http://localhost:3000/`;

    // 사용자를 OAuth 인증 페이지로 리디렉션
    window.location.href = authorizationUrl;
  };

  const getImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/naverhover.png`
      : `${process.env.PUBLIC_URL}/naverButton.png`;

  return (
    <Box component="div" sx={basicBox}>
      <Box sx={secBasicBox}>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={loginBox}>
          <img src={`${Logo}`} style={imageSx} alt="not Logo" />
          <h1 style={{ position: 'relative', color: '#9E9E9E' }}>
            {' '}
            NoName Survey
          </h1>
        </Box>
        {/* 임시 지정 공백, 차후 디자인 수정 예정 */}
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={naverloginButton}>
          {/* <LoginNaver /> */}

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

          {showModal && <BasicModal onClose={() => {}} />}
        </Box>

        <Box sx={emptyBox} />

        <h2 style={{ position: 'relative', marginBottom: '1px' }}>
          Nice to See you Again
        </h2>
        <Button sx={guestLogin} onClick={goLogin}>
          비회원으로 로그인
        </Button>
      </Box>
    </Box>
  );
}

export default LoginDisplay;
