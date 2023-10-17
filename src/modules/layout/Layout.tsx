import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Body from './Body';
// import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Body />
      {/* <Footer /> */}
    </>
  );
}
