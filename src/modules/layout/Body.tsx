import React from 'react';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { routeInfo } from '../route/routeInfo';

const containerStyle = {
  maxWidth: 'md',
  height: '500px',
};

/**
 * Layout의 Body입니다!
 * @returns 페이지 변경 경로
 */
function Body() {
  const location = useLocation();
<<<<<<< HEAD
  console.log(location.pathname);
=======

  const containerStyle = {
    maxWidth: 'md',
    // height: '500px',
  };
>>>>>>> 68c4604995063ab70fb46c3b5ad4290bb09a927e

  return (
    <Container style={containerStyle}>{routeInfo(location.pathname)}</Container>
  );
}

export default Body;
