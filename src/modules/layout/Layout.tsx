import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default function Layout() {
  // 컴포넌트 이름은 대문자로 시작
  return (
    <>
      <CssBaseline />
      <Header />
      <Body />
      <Footer />
    </>
  );
}
