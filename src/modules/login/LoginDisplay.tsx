import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from './components/customApi';
import Logo from './img/SurveyLogo.png';
import LoginFig from './img/LoginFig.png';
import BasicModal from './modal/BasicModal';
import LoginNaver from './LoginNaver';

import { createBrowserHistory } from 'history';

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
  width: '80%',
  height: '50%',
  backgroundColor: 'white',
  borderRadius: '10px',
};

const webSecBasicBox = {
  '@media (min-width: 800px)': {
    width: '25%',
    height: '50%',
  },
};

const loginBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const webImageStyle = {
  '@media (minWidth: 800px)': {
    width: '20%',
  },
};

const mobileImageStyle = {
  width: '20%',
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

  const history = createBrowserHistory();

  useEffect(() => {
    const userNo = localStorage.getItem('userNo');
    const localStorageAccessToken = localStorage.getItem('accessToken');
    const searchParams = new URLSearchParams(location.search);
    const accessCode = searchParams.get('code');

    const redirectUri = '/login/oauth2/code/naver';

    // 뒤로가기 눌렀을때 회원가입 일련의 과정을 모두 취소하는 로직
    const unlisten = history.listen((location) => {
      console.log('location.action : ' + location.action);
      console.log('history.action : ' + history.action);

      if (history.action === 'POP') {
        alert('뒤로 가기 동작이 감지되었습니다.');

        localStorage.removeItem('userNo');
        localStorage.removeItem('userNickname');
        localStorage.removeItem('userImage');
        localStorage.removeItem('accessToken');

        //여기에 임시로 만들어진 미회원 완료 객체 제거 api 요청
        axios
          .get('/login/cancel', {
            params: {
              userNo: userNo,
            },
          })
          .then((response) => {
            // 서버로부터의 응답 처리
            const respData = response.data;

            if (respData === '') {
              alert('회원가입 취소중..');
              setShowModal(false);

              navigate('/');
            }
          })
          .catch(() => {
            alert('api요청 실패!');
            console.error('API 요청 실패!');
          });
      }
    });

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

          if (respData === '' || !responseNickName) {
            alert('로그인이 필요합니다!');
            localStorage.removeItem('userNo');
            localStorage.removeItem('userNickname');
            localStorage.removeItem('userImage');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expiresIn');

            axios.defaults.headers.common['Authorization'] = null;

            navigate('/');
          } else {
            localStorage.setItem('userNo', responseUserNo);
            localStorage.setItem('userNickname', responseNickName);
            localStorage.setItem('userImage', responseImage);
            localStorage.setItem('accessToken', responseAccessToken);
            localStorage.setItem('expiresIn', responseExpiresIn);

            navigate('/survey/main');
          }
        })
        .catch(() => {
          localStorage.removeItem('userNo');
          localStorage.removeItem('userNickname');
          localStorage.removeItem('userImage');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('expiresIn');

          console.info('로그인 되어있지 않습니다!');
        });
    }

    // Authorization code를 받으면 백 서버로 요청을 보내준다.
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

          console.log('유저 번호 : ' + responseUserNo);

          localStorage.setItem('userNo', responseUserNo);
          localStorage.setItem('userNickname', responseNickName);
          localStorage.setItem('userImage', responseImage);
          localStorage.setItem('accessToken', responseAccessToken);
          localStorage.setItem('expiresIn', responseExpiresIn);

          console.log('responseNickName : ' + responseNickName);
          console.log('responseImage : ' + responseImage);

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

            if (responseExpiresIn) {
              // localStrage에 회원 프로필 정보 저장하기
              localStorage.setItem('userNo', responseUserNo);
              localStorage.setItem('userNickname', responseNickName);
              localStorage.setItem('userImage', responseImage);
              localStorage.setItem('accessToken', responseAccessToken);
              localStorage.setItem('expiresIn', responseExpiresIn);
            }

            const expiresAt = localStorage.getItem('expiresIn');
            console.log(`유효시간 확인 : ${expiresAt}`);

            navigate('/survey/main');

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

            axios.defaults.headers.common.Authorization = `Bearer ${responseAccessToken}`;

            setShowModal(true);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return () => {
      unlisten();
    };
  }, [history]);

  const goLogin = () => {
    navigate('/survey/main');
  };

  return (
    <Box component="div" sx={basicBox}>
      <Box sx={{ ...secBasicBox, ...webSecBasicBox }}>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={loginBox}>
          <Box sx={{ ...mobileImageStyle, ...webImageStyle }}>
            <img
              src={`${Logo}`}
              style={{ width: '70%', padding: '15%' }}
              alt="not Logo"
            />
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: '150%', // 150%로 설정하여 1.5배 크기
              color: '#9E9E9E',
              position: 'relative',
              fontWeight: 'bold',
            }}
          >
            NoName Survey
          </Typography>
        </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={emptyBoxSimple}> </Box>
        <Box sx={naverloginButton}>
          <LoginNaver />
        </Box>

        {showModal && <BasicModal onClose={() => {}} />}

        <Box sx={emptyBox} />
        <Typography
          variant="h2"
          sx={{
            fontSize: '100%', // 150%로 설정하여 1.5배 크기
            position: 'relative',
            marginBottom: '1px',
            fontWeight: 'bold',
          }}
        >
          Nice to See you Again
        </Typography>
        <Button sx={guestLogin} onClick={goLogin}>
          비회원으로 로그인
        </Button>
      </Box>
    </Box>
  );
}

export default LoginDisplay;
