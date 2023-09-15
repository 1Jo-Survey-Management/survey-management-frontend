// Footer.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import './Footer.css';

function Footer() {
  return (
    <AppBar
      position="fixed" // 고정 위치
      sx={{
        top: 'auto', // 화면 상단으로부터의 거리
        bottom: 0, // 화면 하단
        width: '100%', // 전체 화면 너비
        height: 100,
        backgroundColor: (theme) => theme.palette.primary.main, // 배경색 설정
        marginTop: '500px', // 헤더와의 간격을 조절할 수 있습니다.
      }}
    >
      {/* Footer 내용 */}
      <p className="footer-logo">푸터</p>
    </AppBar>
  );
}

export default Footer;
