import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
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

  const cancelSubmit = async () => {
    const userNo = localStorage.getItem('userNo');
    const userNickname = localStorage.getItem('userNickname');

    if (userNo !== '' && userNickname === '') {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/cancel`,
          {
            params: {
              userNo,
            },
          }
        );

        const respData = response.data;
        if (respData === '') {
          console.error('API 요청 실패');
          return;
        }
      } catch (error) {
        console.error(error);
      }

      localStorage.removeItem('userNo');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userNickname');
      localStorage.removeItem('userImage');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('accessCode');
    }
  };

  useEffect(() => {
    const localStorageAccessToken = localStorage.getItem('accessToken');
    const searchParams = new URLSearchParams(location.search);
    const redirectUri = '/api/oauthLogin/oauth2/code/naver';

    const accessCode = searchParams.get('code');
    const duplicateAccessCode = localStorage.getItem('accessCode');

    const accessCodeDuplicateCheck = () => {
      let duplicatedCheck = false;
      if (duplicateAccessCode !== accessCode) {
        duplicatedCheck = true;
      }

      return duplicatedCheck;
    };

    if (accessCode && accessCodeDuplicateCheck()) {
      axios
        .get(redirectUri, {
          params: {
            code: accessCode,
            state: 'STATE_STRING',
          },
        })
        .then((response) => {
          const responseCheck = response;
          const responseUserNo = responseCheck.data.content.userNo;
          const responseAccessToken = responseCheck.data.content.accessToken;
          const responseImage = responseCheck.data.content.userImage;
          const responseNickName = responseCheck.data.content.userNickname;
          const responseExpiresIn = responseCheck.data.content.expiresIn;

          localStorage.setItem('accessCode', accessCode);
          localStorage.setItem('userNo', responseUserNo);
          localStorage.setItem('userNickname', responseNickName);
          localStorage.setItem('userImage', responseImage);
          localStorage.setItem('accessToken', responseAccessToken);
          localStorage.setItem('expiresIn', responseExpiresIn);

          if (responseUserNo != null && responseNickName != null) {
            if (
              localStorageAccessToken == null ||
              responseAccessToken !== localStorageAccessToken
            ) {
              localStorage.setItem('userNo', responseUserNo);
              localStorage.setItem('userNickname', responseNickName);
              localStorage.setItem('userImage', responseImage);
              localStorage.setItem('accessToken', responseAccessToken);
              localStorage.setItem('expiresIn', responseExpiresIn);

              axios.defaults.headers.common.Authorization = `Bearer ${responseAccessToken}`;

              navigate('/survey/main');
              return;
            }

            if (responseExpiresIn) {
              localStorage.setItem('userNo', responseUserNo);
              localStorage.setItem('userNickname', responseNickName);
              localStorage.setItem('userImage', responseImage);
              localStorage.setItem('accessToken', responseAccessToken);
              localStorage.setItem('expiresIn', responseExpiresIn);
            }
            navigate('/survey/main');

            if (responseAccessToken === localStorageAccessToken) {
              axios.defaults.headers.common.Authorization = `Bearer ${responseAccessToken}`;
              navigate('/survey/main');
            } else {
              localStorage.removeItem('userNo');
              localStorage.removeItem('userNickname');
              localStorage.removeItem('userImage');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('expiresIn');
              localStorage.removeItem('refreshToken');

              navigate('/login');
            }
          }

          if (responseUserNo != null && !responseNickName) {
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
          console.error('Error : ', error);
        });
    } else {
      cancelSubmit();
      navigate('/login');
    }
  }, []);

  const goLogin = () => {
    navigate('/survey/main');
  };

  return (
    <Box sx={basicBox}>
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
              fontSize: '150%',
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
            fontSize: '100%',
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
