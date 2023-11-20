/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from '../login/components/customApi';
import '../../global.css';
import logoplus from './logoplus.png';
import './Header.css';
import Menu from './Menu';
import logoutbutton from './logoutbutton.png';
import loginbutton from './loginbutton.png';

const ANCHOR_TYPE = 'left';

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
    <Box
      sx={{ flexGrow: 1, display: 'center', alignItems: 'flex-end' }}
      height={90}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
          height: '110px',
          marginBottom: '0',
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            sx={{ color: '#272727', marginTop: '15px' }}
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
              maxWidth: '125px', // 최대 너비 설정
              maxHeight: '110px', // 최대 높이 설정
              display: 'center',
              justifyItems: 'center',
            }}
          >
            {/* 로고 타이틀, 이미지로 삽입했음 */}
            <img
              src={logoplus}
              alt="로고"
              style={{
                width: '100%', // 너비 100%로 설정하여 부모 요소에 맞추기
                height: 'auto', // 원본 이미지의 비율 유지
                color: '#000000',
                marginLeft: '10px',
                marginTop: '20px',
              }}
              onClick={goMain}
              onKeyDown={goMain}
              role="presentation"
            />
          </div>
          {!hasAccessToken ? (
            <img
              src={loginbutton}
              alt="로그인"
              style={{
                width: '40px', // 너비 100%로 설정하여 부모 요소에 맞추기
                height: 'auto', // 원본 이미지의 비율 유지
                marginRight: '12px',
                marginTop: '20px',
              }}
              onClick={login}
              onKeyDown={login}
              role="presentation"
            />
          ) : (
            <img
              src={logoutbutton}
              alt="로그아웃"
              style={{
                width: '50px', // 너비 100%로 설정하여 부모 요소에 맞추기
                height: 'auto', // 원본 이미지의 비율 유지
                marginRight: '12px',
                marginTop: '20px',
              }}
              onClick={logout}
              onKeyDown={logout}
              role="presentation"
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
