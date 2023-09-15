// Footer.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          My Footer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
