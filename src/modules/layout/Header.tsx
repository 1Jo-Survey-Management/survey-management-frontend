import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import MenuTool from './MenuTool';
import './Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const goMain = () => {
    navigate('/survey/main');
  };

  const logout = () => {
    navigate('/');
  };

  // 현재 경로가 '/'이면 로그아웃 버튼을 숨깁니다.
  const isHomePage = location.pathname === '/';

  // console.log(`헤더에서 여기 어디${  location.pathname}`);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuTool /> {/* MenuTool 컴포넌트를 렌더링 */}
          <Typography variant="h6" onClick={goMain}>
            Logo survey
          </Typography>
          {/* <Button onClick={goMypage} color="inherit">
            마이페이지
          </Button> */}
          {isHomePage ? null : (
            <Button onClick={logout} color="inherit">
              로그아웃
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
