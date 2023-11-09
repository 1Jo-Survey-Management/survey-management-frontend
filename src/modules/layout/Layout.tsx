import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import LoginPage from '../login/LoginDisplay';

/**
 * 페이지의 Header, Body, Footer를 모아놓은 Layout 입니다.
 * @returns Header,Body,Footer
 */
export default function Layout() {
  const location = useLocation();

  // useEffect(() => {
  //   const responseAcccessToken = localStorage.getItem('accessToken');
  //   console.log(`로컬스토리지 토큰 : ${responseAcccessToken}`);
  //   axios.defaults.headers.common.Authorization = `Bearer ${responseAcccessToken}`;
  // }, []);

  console.log(`현재 위치 : ${location.pathname}`);

  const backStyle = {
    backgroundColor: '#FFFDF8',
  };

  const isLoginPage = location.pathname === '/';
  return (
    <div style={backStyle}>
      <CssBaseline />

      <Header />

      {isLoginPage ? (
        <LoginPage />
      ) : (
        <Container sx={{ backgroundColor: '#FFFDF8' }}>
          <Outlet />
        </Container>
      )}
      <Footer />
    </div>
  );
}
