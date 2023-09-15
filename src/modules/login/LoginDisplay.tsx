// LoginDisplay.tsx
import React from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginDisplay() {
  // const location = useLocation();
  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/survey/main');
  };

  // console.log(location.pathname);
  return (
    <Container maxWidth="md">
      <h1>Login Display</h1>

      <Button onClick={goLogin}>로그인하기</Button>
    </Container>
  );
}

export default LoginDisplay;
