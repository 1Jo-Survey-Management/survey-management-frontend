import React from 'react';
import './Footer.css';
import { Box, Toolbar, Typography } from '@mui/material';

const fontFamily = "'Gaegu', sans-serif";
const textStyle = {
  fontFamily,
};

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        top: 'auto',
        width: '100%',
        height: '5%',
        bottom: 0,
        marginTop: '500px',
      }}
      color="D3D4F5"
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontSize="60%"
          color="#AFB2F0"
          fontStyle={textStyle}
        >
          NoName Survey v.0.0.1
        </Typography>
      </Toolbar>
    </Box>
  );
}

export default Footer;
