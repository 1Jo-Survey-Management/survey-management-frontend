// LoginDisplay.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LoginFig from './img/LoginFig.png';
import Logo from './img/SurveyLogo.png';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';

import LoginNaver from './LoginNaver';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LoginDisplay: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goLogin = () => {
    console.log('nono');
    navigate('/survey/main');
  };

  <CssBaseline />;

  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    const state = location.hash.split('=')[2].split('&')[0];
    console.log('AccessToken : ' + token);
    console.log('State : ' + state);
  };

  useEffect(() => {
    getNaverToken();
  }, []);

  console.log(location.pathname);
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
          <img src={`${Logo}`} style={{ width: '50px', marginRight: '10px' }} />
          <h1 style={{ position: 'relative', color: '#9E9E9E' }}>
            {' '}
            NoName Survey
          </h1>
        </Box>

        <Box style={{ height: '50px' }}></Box>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoginNaver />
        </Box>

        <Box style={{ height: '50px' }}></Box>

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
};

export default LoginDisplay;
