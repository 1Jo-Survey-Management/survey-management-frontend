import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
<<<<<<< HEAD
// import Footer from './Footer';
=======
import LoginPage from '../login/LoginDisplay';
import axios from '../login/components/customApi';
>>>>>>> origin/develop

/**
 * 페이지의 Header, Body, Footer를 모아놓은 Layout 입니다.
 * @returns Header,Body,Footer
 */
export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const responseAcccessToken = localStorage.getItem('accessToken');

    axios.defaults.headers.common.Authorization = `Bearer ${responseAcccessToken}`;
  }, []);

  const isLoginPage = location.pathname === '/';
  return (
    <>
      <CssBaseline />
<<<<<<< HEAD
      <Header />
      <Body />
=======

      {isLoginPage ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          <Body />
          {/* <Footer /> */}
        </>
      )}
>>>>>>> origin/develop
    </>
  );
}
