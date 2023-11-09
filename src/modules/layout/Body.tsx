// // Body.tsx
// import React from 'react';
// import Container from '@mui/material/Container';
// import { useLocation } from 'react-router-dom';
// import { routeInfo } from '../route/routeInfo';

// /**
//  * Layout의 Body입니다!
//  * @returns 페이지 변경 경로
//  */
// function Body() {
//   const location = useLocation();

//   const containerStyle = {
//     maxWidth: 'md',
//     height: '500px',
//   };

//   console.log(location.pathname);
//   return (
//     <Container style={containerStyle}>{routeInfo(location.pathname)}</Container>
//   );
// }

// export default Body;
