/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../../global.css';
import Menu from './Menu';

import axios from '../login/components/customApi';

const ANCHOR_TYPE = 'left';

const StyledButton = styled.button`
  background-color: #ffffff;
  border: 0px solid #000;
  border-radius: 3px;
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 20px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 50px;
    height: 20px;
  }
`;

/**
 * 웹 애플리케이션의 헤더 컴포넌트입니다.
 * @author 김선규
 */
function Header() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getLogoutImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/images/loginImage/logoutbuttonhover.png`
      : `${process.env.PUBLIC_URL}/images/loginImage/logoutbutton.png`;

  const getLoginImageSrc = () =>
    isHovered
      ? `${process.env.PUBLIC_URL}/images/loginImage/loginbuttonhover.png`
      : `${process.env.PUBLIC_URL}/images/loginImage/loginbutton.png`;

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
    localStorage.removeItem('isMember');

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
            {!properLogin() ? '' : <MenuIcon />}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            {!properLogin() ? (
              <StyledButton
                type="button"
                onClick={login}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  backgroundImage: `url(${getLoginImageSrc()})`,
                }}
              >
                {}
              </StyledButton>
            ) : (
              <StyledButton
                type="button"
                onClick={logout}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  backgroundImage: `url(${getLogoutImageSrc()})`,
                }}
              >
                {}
              </StyledButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
