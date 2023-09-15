import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import LoginPage from '../login/LoginDisplay';

export default function Layout() {
  // 컴포넌트 이름은 대문자로 시작

  const location = useLocation();

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
    </>
  );
}
