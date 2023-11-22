import React from 'react';
import './Footer.css';
import { Box, Toolbar, Typography, Divider } from '@mui/material';

/**
 * Layout의 Footer 입니다
 * @returns Footer
 */
function Footer() {
  return (
    <div>
      <Divider sx={{ marginTop: '70px' }} />
      <Box
        sx={{
          position: 'static',
          display: 'flex',
          bottom: 0,
          width: '100%',
          height: '120px',
          justifyContent: 'center',
          zIndex: 1000,
          alignItems: 'center',
        }}
        color="D3D4F5"
      >
        <Toolbar>
          <Typography variant="h6" fontWeight="700" color="#3e3e3e">
            Survey Plus v.0.0.1
          </Typography>
        </Toolbar>
      </Box>
    </div>
  );
}

export default Footer;
