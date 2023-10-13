import React from 'react';
import AppBar from '@mui/material/AppBar';
import './Footer.css';

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
<<<<<<< HEAD
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          My Footer
        </Typography>
      </Toolbar>
=======
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
>>>>>>> 68c4604995063ab70fb46c3b5ad4290bb09a927e
    </AppBar>
  );
}

export default Footer;
