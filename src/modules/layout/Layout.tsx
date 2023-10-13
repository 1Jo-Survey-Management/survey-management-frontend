import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
<<<<<<< HEAD
import LoginPage from '../login/LoginDisplay';
import axios from '../login/components/customApi';
=======
>>>>>>> 68c4604995063ab70fb46c3b5ad4290bb09a927e

/**
 * 페이지의 Header, Body, Footer를 모아놓은 Layout 입니다.
 * @returns Header,Body,Footer
 */
export default function Layout() {
<<<<<<< HEAD
  const location = useLocation();

  useEffect(() => {
    const responseAcccessToken = localStorage.getItem('accessToken');

    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + responseAcccessToken;
  }, []);

  const isLoginPage = location.pathname === '/';
  return (
    <>
      <CssBaseline />

      {isLoginPage ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          <Body />
          <Footer />
        </>
      )}
=======
  return (
    <>
      <CssBaseline />
      <Header />
      <Body />
      <Footer />
>>>>>>> 68c4604995063ab70fb46c3b5ad4290bb09a927e
    </>
  );
}
