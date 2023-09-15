// Body.tsx
import React from 'react';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import { routeInfo } from '../route/routeInfo';

const containerStyle = {
  maxWidth: 'md',
  height: '500px', // 높이를 원하는 값으로 설정하세요.
  // 다른 스타일 속성도 필요한 경우 추가할 수 있습니다.
};

/**
 * Layout의 Body입니다!
 * @returns 페이지 변경 경로
 */
function Body() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Container style={containerStyle}>{routeInfo(location.pathname)}</Container>
  );
}

export default Body;
