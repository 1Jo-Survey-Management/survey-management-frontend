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
        position: 'fixed',
        display: 'flex',
        bottom: 0, // 화면 최상단에 고정
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        backgroundColor: '#a9eb8a', // 배경색 추가
        zIndex: 1000, // 적절한 값으로 조절
      }}
      color="D3D4F5"
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontSize="80%"
          fontWeight={'700'}
          color="#25263f"
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
