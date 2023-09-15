import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

/**
 * 메뉴탭이 있는 Layout의 Header입니다.
 * @returns Header
 */
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  // 현재 경로가 '/'이면 로그아웃 버튼을 숨깁니다.
  const isHomePage = location.pathname === '/';

  console.log(`헤더에서 여기 어디${location.pathname}`);

  const goMypage = () => {
    console.log('mypage');
    navigate('/survey/Mypage');
  };

  const logout = () => {
    console.log('logout');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My Header</Typography>
        <Button onClick={goMypage} color="inherit">
          마이페이지
        </Button>
        {isHomePage ? null : (
          <Button onClick={logout} color="inherit">
            로그아웃
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
