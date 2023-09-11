import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import LoginPage from '../login/LoginDisplay'
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

export default function Layout() { // 컴포넌트 이름은 대문자로 시작


  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
    <React.Fragment>
      <CssBaseline />
      
      {isLoginPage ? <LoginPage/> : <><Header /><Body /><Footer /></>}
      
    </React.Fragment>
  );
}
