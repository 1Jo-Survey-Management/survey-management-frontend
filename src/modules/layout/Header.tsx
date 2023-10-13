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

  const logout = () => {
    console.log('logout');

    axios
      .get('/login/logout')
      .then((response) => {
        const respData = response.data;
        console.log(`API 요청 : ${JSON.stringify(respData, null, 2)}`);
        axios.defaults.headers.common['Authorization'] = null;

        if (respData === '') {
          console.log('API 요청 실패');
        }

        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isHomePage = location.pathname === '/';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuTool />
          <Typography variant="h6" onClick={goMain}>
            Logo survey
          </Typography>
          {isHomePage ? null : (
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
