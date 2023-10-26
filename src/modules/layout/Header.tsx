import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from '../login/components/customApi';
import '../../global.css';

import MenuTool from './MenuTool';
import './Header.css';

const fontFamily = "'Gaegu', sans-serif";

const textStyle = {
  fontFamily,
};
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
    console.log('logout');

    axios.get('/login/logout').then((response) => {
      const respData = response.data;
      console.log(`API 요청 : ${JSON.stringify(respData, null, 2)}`);
      axios.defaults.headers.common.Authorization = null;

      if (respData === '') {
        console.log('API 요청 실패');
      }
    });

    navigate('/');
  };

  const isHomePage = location.pathname === '/';
  const hasAccessToken = localStorage.getItem('accessToken');

  return (
    <Box sx={{ flexGrow: 1 }} height={100} color="D3D4F5">
      {/* <AppBar position="static"> */}
      <Toolbar>
        <MenuTool />
        <Typography
          onClick={goMain}
          variant="h6"
          fontSize="50px"
          color="#AFB2F0"
          sx={{ fontStyle: textStyle }}
        >
          Logo survey
        </Typography>
        {isHomePage ? null : (
          <Button
            onClick={logout}
            sx={{ color: '#AFB2F0', fontStyle: textStyle, fontSize: '20px' }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
      {/* </AppBar> */}
    </Box>
  );
}

export default Header;
