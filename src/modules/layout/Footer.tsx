import React from 'react';
import './Footer.css';
import { Box, Toolbar, Typography } from '@mui/material';

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  const textStyle = {
    fontFamily: 'nanumsquare',
  };

  return (
    <Box
      sx={{
        position: 'static',
        display: 'flex',
        bottom: 0,
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        backgroundColor: '#4B4C54',
        zIndex: 1000,
        marginTop: '30px',
      }}
      color="D3D4F5"
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontSize="80%"
          fontWeight="700"
          color="#ffffff"
          sx={textStyle}
          fontStyle={textStyle}
        >
          NoName Survey v.0.0.1
        </Typography>
      </Toolbar>
    </Box>
  );
}

export default Footer;
