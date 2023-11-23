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
import Menu from './Menu';

const ANCHOR_TYPE = 'left';

/**
 * 웹 애플리케이션의 헤더 컴포넌트입니다.
 * @author 김선규
 */
function Header() {
  const navigate = useNavigate();

  /**
   * 메인 페이지로 이동하는 함수
   * @author 김선규
   */
  const goMain = () => {
    navigate('/');
  };

  /**
   * 로그인 페이지로 이동하는 함수
   * @author 김선규
   */
  const login = () => {
    console.log('login');

    navigate('/login');
  };

  /**
   * 로그아웃을 수행하고 로그인 정보를 로컬 스토리지에서 제거하는 함수
   * @authro 김선규
   */
  const logout = () => {
    console.log('logout');

    localStorage.removeItem('userNo');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresIn');

    axios.defaults.headers.common.Authorization = null;

    navigate('/login');
  };

  /**
   * 현재 사용자가 로그인 상태인지 확인하는 함수
   * @returns {boolean} 로그인 상태 여부
   * @author 김선규
   */
  const properLogin = () => {
    const hasProperLogin = localStorage.getItem('userNickname');

    let loginCheck = false;

    if (hasProperLogin !== null) {
      console.log('????');
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
          height: '110px',
          marginBottom: '0',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            width: '100%',
            height: '60px',
            marginTop: '15px',
          }}
        >
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
              maxWidth: '125px',
              maxHeight: '110px',
              display: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/surveyLogo/logoplus.png`}
              alt="로고"
              style={{
                width: '100%',
                height: 'auto',
                color: '#000000',
                marginLeft: '10px',
                marginTop: '20px',
              }}
              onClick={goMain}
              onKeyDown={goMain}
              role="presentation"
            />
          </div>
          {!properLogin() ? (
            <img
              src={`${process.env.PUBLIC_URL}/images/loginImage/loginbutton.png`}
              alt="로그인"
              style={{
                width: '40px',
                height: 'auto',
                marginRight: '12px',
                marginTop: '20px',
              }}
              onClick={login}
              onKeyDown={login}
              role="presentation"
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/images/loginImage/logoutbutton.png`}
              alt="로그아웃"
              style={{
                width: '50px',
                height: 'auto',
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
