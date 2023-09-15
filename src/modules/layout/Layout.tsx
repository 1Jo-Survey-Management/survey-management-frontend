import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import LoginPage from '../login/LoginDisplay';

export default function Layout() {
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
