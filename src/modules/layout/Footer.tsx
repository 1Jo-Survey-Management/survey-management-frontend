import React from 'react';
import AppBar from '@mui/material/AppBar';
import './Footer.css';

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
    <AppBar
      position="static"
      sx={{
        top: 'auto',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: '#FFFDF8',
        marginTop: '50px',
      }}
    >
      <p>Footer</p>
    </AppBar>
  );
}

export default Footer;
