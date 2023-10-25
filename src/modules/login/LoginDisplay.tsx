import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import axios from './components/customApi';
import Logo from './img/SurveyLogo.png';
import LoginFig from './img/LoginFig.png';
import BasicModal from './modal/BasicModal';
import LoginNaver from './LoginNaver';

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

/**
 * 로그인 화면
 * @author 김선규
 * @returns LoginDispay
 */
function LoginDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localStorageAccessToken = localStorage.getItem('accessToken');
    const searchParams = new URLSearchParams(location.search);
    const accessCode = searchParams.get('code');

    const redirectUri = '/login/oauth2/code/naver';

    // accessToken이 유효한지 api를 통해서 확인 (로그인 했는데 로그아웃 안했을때)
    if (localStorageAccessToken != null && !accessCode) {
      axios.defaults.headers.common['Authorization'] =
      'Bearer ' + localStorageAccessToken;

      // 액세스 토큰이 유효한지 api를 쏴서 확인하면서 로그인 처리
      axios
      .post('/login/user')
      .then((response) => {
        // 서버로부터의 응답 처리
        const respData = response.data;
        const responseCheck = response;
        const responseUserNo = responseCheck.data.content.userNo;
        const responseAccessToken = responseCheck.data.content.accessToken;
        const responseImage = responseCheck.data.content.userImage;
        const responseNickName = responseCheck.data.content.userNickname;
        const responseExpiresIn = responseCheck.data.content.expiresIn;

        localStorage.setItem('userNo', responseUserNo);
        localStorage.setItem('userNickname', responseNickName);
        localStorage.setItem('userImage', responseImage);
        localStorage.setItem('accessToken', responseAccessToken);
        localStorage.setItem('expiresIn', responseExpiresIn);

        if (respData === '') {
          alert('로그인이 필요합니다!');
          console.error('API 응답 데이터 없음!');
        }
      })
      .catch((error) => {
        alert('로그인이 필요합니다!');
        console.error(error);
        localStorage.removeItem('userNo');
        localStorage.removeItem('userNickname');
        localStorage.removeItem('userImage');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('refreshToken');
        console.error('API 요청 실패!');
        navigate('/');

      });

      navigate('/survey/main');
    }

    //Authorization code를 받으면 백 서버로 요청을 보내준다.
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
          const responseUserNo = responseCheck.data.content.userNo;
          const responseAccessToken = responseCheck.data.content.accessToken;
          const responseImage = responseCheck.data.content.userImage;
          const responseNickName = responseCheck.data.content.userNickname;
          const responseExpiresIn = responseCheck.data.content.expiresIn;

          localStorage.setItem('userNo', responseUserNo);
          localStorage.setItem('userNickname', responseNickName);
          localStorage.setItem('userImage', responseImage);
          localStorage.setItem('accessToken', responseAccessToken);
          localStorage.setItem('expiresIn', responseExpiresIn);

          // 1. 완료된 회원
          if (responseUserNo != null && responseNickName != null) {
            // 회원은 존재하나 브라우저에서 로그인 한적이 없는 회원

            if (
              localStorageAccessToken == null ||
              responseAccessToken !== localStorageAccessToken
            ) {
              // localStrage에 회원 프로필 정보 저장하기
              localStorage.setItem('userNo', responseUserNo);
              localStorage.setItem('userNickname', responseNickName);
              localStorage.setItem('userImage', responseImage);
              localStorage.setItem('accessToken', responseAccessToken);
              localStorage.setItem('expiresIn', responseExpiresIn);

              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + responseAccessToken;

              navigate('/survey/main');
              return;
            }
            // 회원도 존재하고 브라우저에 로그인도 했었던 회원
            else {
              if (responseExpiresIn) {
                // localStrage에 회원 프로필 정보 저장하기
                localStorage.setItem('userNo', responseUserNo);
                localStorage.setItem('userNickname', responseNickName);
                localStorage.setItem('userImage', responseImage);
                localStorage.setItem('accessToken', responseAccessToken);
                localStorage.setItem('expiresIn', responseExpiresIn);
              }

              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + responseAccessToken;

              navigate('/survey/main');
            }

            // 현 브라우저에서 로그인 한적이 있어 localStorage에 토큰이 있는 회원
            if (responseAccessToken === localStorageAccessToken) {
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + responseAccessToken;
              navigate('/survey/main');
            }
            // 토큰이 유효하지 않으면 다시 로그인해야해서 로컬스토리지 다지움
            else {
              localStorage.removeItem('userNo');
              localStorage.removeItem('userNickname');
              localStorage.removeItem('userImage');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('expiresIn');
              localStorage.removeItem('refreshToken');

              navigate('/');
            }
          }

          // 2. 첫 로그인 시
          if (responseUserNo != null && !responseNickName) {
            // localStrage에 회원 프로필 정보 저장하기
            localStorage.setItem('userNo', responseUserNo);
            localStorage.setItem('userNickname', responseNickName);
            localStorage.setItem('userImage', responseImage);
            localStorage.setItem('accessToken', responseAccessToken);
            localStorage.setItem('expiresIn', responseExpiresIn);

            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + responseAccessToken;
            responseAccessToken;

            setShowModal(true);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);

  const goLogin = () => {
    navigate('/survey/main');
  };

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
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={naverloginButton}>
          <LoginNaver />

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
