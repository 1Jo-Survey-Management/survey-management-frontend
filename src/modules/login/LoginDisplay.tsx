import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import axios from './components/customApi';
import BasicModal from './modal/BasicModal';
import LoginNaver from './LoginNaver';

const basicBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  width: '100%',
  height: '100%',

  backgroundImage: `url(${process.env.PUBLIC_URL}/images/loginImage/LoginPageImage2.png)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const secBasicBox = {
  width: '250px',
  height: '330px',
  padding: '20px 20px 20px 20px ',
  border: '0px solid #747474',
  backgroundColor: 'white',
  borderRadius: '10px',
  opacity: '95%',
};

const guestLogin = {
  width: '100%',
  textAlign: 'center',
  color: '#747474',
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
    const redirectUri = `${process.env.REACT_APP_BASE_URL}/api/oauthLogin/oauth2/code/naver`;

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
      <Box sx={secBasicBox}>
        <Box sx={{ textAlign: 'center', padding: '35px 0 20px 0' }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/surveyLogo/logoplus.png`}
            style={{ width: '150px', height: '80px' }}
            alt="not Logo"
          />
        </Box>
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            margin: '5px 0 20px 0',
            fontSize: '1rem',
            color: '#747474',
            fontWeight: 'bold',
          }}
        >
          설문의 새로운 경험
        </Typography>
        <Box sx={{ margin: '20px 0 20px 0' }}>
          <LoginNaver />
        </Box>
        {showModal && <BasicModal onClose={() => {}} />}

        <Typography
          variant="h2"
          sx={{
            fontSize: '100%',
            position: 'relative',
            marginBottom: '1px',
            fontWeight: 'bold',
            textAlign: 'center',
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
