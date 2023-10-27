// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import './Footer.css';



/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: (theme) => theme.palette.primary.main,
        marginTop: '500px',
      }}
    >
      <p className="footer-logo">Footer</p>
    </AppBar>
  );
}

// export default Footer;
