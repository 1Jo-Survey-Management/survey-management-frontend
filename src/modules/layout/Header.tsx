import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from '../login/components/customApi';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const goMypage = () => {
    console.log('mypage');
    navigate('/survey/Mypage');
  };

  const logout = () => {
    console.log('logout');

    axios
      .get('/login/logout')
      .then((response) => {
        const respData = response.data;
        console.log(`API 요청 : ${JSON.stringify(respData, null, 2)}`);
        axios.defaults.headers.common['Authorization'] = null;

        if (respData === '') {
          console.log('API 요청 실패');
        }

        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isHomePage = location.pathname === '/';

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
