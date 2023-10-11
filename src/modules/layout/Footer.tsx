// Footer.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import './Footer.css';

function Footer() {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        width: '100%',
        height: 100,
      }}
    >
      {/* Footer 내용 */}
      <p className="footer-logo">푸터</p>
    </AppBar>
  );
}

export default Footer;
