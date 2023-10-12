import React from 'react';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { routeInfo } from '../route/routeInfo';

function Body() {
  const location = useLocation();

  const containerStyle = {
    maxWidth: 'md',
    // height: '500px',
  };

  return (
    <Container style={containerStyle}>{routeInfo(location.pathname)}</Container>
  );
}

export default Body;
