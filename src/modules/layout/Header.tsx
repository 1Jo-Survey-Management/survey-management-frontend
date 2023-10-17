import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from '../login/components/customApi';

import MenuTool from './MenuTool';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/survey/main');
  };

  const login = () => {
    console.log('login');

    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');

    axios.defaults.headers.common['Authorization'] = null;

    navigate('/');
  };

  const isHomePage = location.pathname === '/';
  const hasAccessToken = localStorage.getItem('accessToken');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuTool />
          <Typography variant="h6" onClick={goMain}>
            Logo survey
          </Typography>
          {isHomePage || !hasAccessToken ? (
            <Button onClick={login} color="inherit">
              로그인
            </Button>
          ) : (
            <Button onClick={logout} color="inherit">
              로그아웃
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
