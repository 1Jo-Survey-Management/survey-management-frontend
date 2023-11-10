import React from 'react';
import AppBar from '@mui/material/AppBar';
import './Footer.css';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';

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
      position={'fixed'}
      color="D3D4F5"
    >
      <Toolbar>
        <Typography variant="h6" fontSize="60%" color="#AFB2F0">
          NoName Survey v.0.0.1
        </Typography>
      </Toolbar>
    </Box>
  );
}
