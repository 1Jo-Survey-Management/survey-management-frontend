/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from '../login/components/customApi';

import './Header.css';
import '../../global.css';
import Menu from './Menu';

const fontFamily = "'Gaegu', sans-serif";
const textStyle = {
  fontFamily,
};

const ANCHOR_TYPE = 'left';

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

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');

    axios.defaults.headers.common.Authorization = null;

    navigate('/');
  };

  const isHomePage = location.pathname === '/';
  const hasAccessToken = localStorage.getItem('accessToken');

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpenDrawer(open);
    };

  return (
    <Box sx={{ flexGrow: 1 }} height={100} color="D3D4F5">
      {/* <AppBar position="static"> */}
      <Toolbar>
        <IconButton size="large" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: '#AFB2F0' }} />
        </IconButton>

        <React.Fragment key={ANCHOR_TYPE}>
          <Drawer
            anchor={ANCHOR_TYPE}
            open={isOpenDrawer}
            onClose={toggleDrawer(false)}
          >
            <Menu toggleDrawer={toggleDrawer} />
          </Drawer>
        </React.Fragment>

        <Typography
          onClick={goMain}
          variant="h6"
          fontSize="150%"
          color="#AFB2F0"
          sx={{ fontStyle: textStyle }}
        >
          NoName Survey
        </Typography>
        {isHomePage || !hasAccessToken ? (
          <Button
            onClick={login}
            color="inherit"
            sx={{ color: '#AFB2F0', fontStyle: textStyle, fontSize: '20px' }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={logout}
            color="inherit"
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
