/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from '../login/components/customApi';
import '../../global.css';
import logoblack from './logoblack.png';
import './Header.css';
import Menu from './Menu';

const ANCHOR_TYPE = 'left';

const fontFamily = "'Gaegu', sans-serif";
const textStyle = {
  fontFamily,
};

function Header() {
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/survey/main');
  };

  const login = () => {
    console.log('login');

    navigate('/loginDisplay');
  };

  const logout = () => {
    console.log('logout');

    localStorage.removeItem('userNo');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');

    axios.defaults.headers.common.Authorization = null;

    navigate('/loginDisplay');
  };
  const hasProperLogin = localStorage.getItem('userNickname');

  const properLogin = () => {
    let loginCheck = false;
    if (hasProperLogin !== null) {
      loginCheck = true;
    }
    return loginCheck;
  };

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
    <Box
      sx={{ flexGrow: 1, display: 'center', alignItems: 'flex-end' }}
      height={90}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
          height: '90px',
          marginBottom: '0',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            sx={{ color: '#000000' }}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
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
          <div
            style={{
              maxWidth: '250px', // 최대 너비 설정
              maxHeight: '60px', // 최대 높이 설정
              display: 'center',
              justifyItems: 'center',
            }}
          >
            {/* 로고 타이틀, 이미지로 삽입했음 */}
            <img
              src={logoblack}
              alt="로고"
              style={{
                width: '100%', // 너비 100%로 설정하여 부모 요소에 맞추기
                height: 'auto', // 원본 이미지의 비율 유지
                color: '#000000',
              }}
              onClick={goMain}
              onKeyDown={goMain}
              role="presentation"
            />
          </div>
          {!properLogin() ? (
            <Button
              onClick={login}
              sx={{ color: '#000000', fontStyle: textStyle, fontSize: '20px' }}
            >
              LogIn
            </Button>
          ) : (
            <Button
              onClick={logout}
              sx={{ color: '#000000', fontStyle: textStyle, fontSize: '20px' }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
